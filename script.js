// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Navbar scroll effect
  const navbar = document.getElementById("navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".experience-card, .skill-category, .about-text, .contact-info, .contact-form",
  )

  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Contact form handling
  const contactForm = document.getElementById("contact-form")

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const submitButton = contactForm.querySelector(".submit-button")
    const originalText = submitButton.textContent

    // Update button state
    submitButton.textContent = "Sending..."
    submitButton.disabled = true

    try {
      const response = await fetch("contact.php", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        submitButton.textContent = "Message Sent!"
        contactForm.reset()

        // Show success message
        setTimeout(() => {
          submitButton.textContent = originalText
          submitButton.disabled = false
        }, 2000)
      } else {
        throw new Error(result.message || "Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      submitButton.textContent = "Error - Try Again"

      setTimeout(() => {
        submitButton.textContent = originalText
        submitButton.disabled = false
      }, 3000)
    }
  })

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        const offsetTop = target.offsetTop - 70 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Add stagger animation to skill items
  const skillCategories = document.querySelectorAll(".skill-category")

  skillCategories.forEach((category, categoryIndex) => {
    const items = category.querySelectorAll("li")

    items.forEach((item, itemIndex) => {
      item.style.opacity = "0"
      item.style.transform = "translateX(-20px)"
      item.style.transition = `opacity 0.4s ease ${itemIndex * 0.1}s, transform 0.4s ease ${itemIndex * 0.1}s`
    })

    const categoryObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll("li")
          items.forEach((item) => {
            item.style.opacity = "1"
            item.style.transform = "translateX(0)"
          })
        }
      })
    }, observerOptions)

    categoryObserver.observe(category)
  })

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero")
    const heroContent = document.querySelector(".hero-content")

    if (hero && heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })

  // Travel timeline animation
  const timelineItems = document.querySelectorAll(".timeline-item")

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
        }
      })
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  timelineItems.forEach((item) => {
    timelineObserver.observe(item)
  })

  initializeGalleries()
})

function initializeGalleries() {
  const travelPlaces = document.querySelectorAll(".travel-place")

  travelPlaces.forEach((place) => {
    const gallery = place.querySelector(".place-gallery")
    const slides = place.querySelectorAll(".gallery-slide")
    const dots = place.querySelectorAll(".dot")
    let currentSlide = 0
    let autoSlideInterval

    // Create navigation arrows
    const prevBtn = document.createElement("button")
    prevBtn.className = "gallery-nav prev"
    prevBtn.innerHTML = "‹"
    prevBtn.setAttribute("aria-label", "Previous image")

    const nextBtn = document.createElement("button")
    nextBtn.className = "gallery-nav next"
    nextBtn.innerHTML = "›"
    nextBtn.setAttribute("aria-label", "Next image")

    gallery.appendChild(prevBtn)
    gallery.appendChild(nextBtn)

    // Function to show specific slide
    function showSlide(index) {
      // Remove active class from all slides and dots
      slides.forEach((slide) => slide.classList.remove("active"))
      dots.forEach((dot) => dot.classList.remove("active"))

      // Add active class to current slide and dot
      if (slides[index]) {
        slides[index].classList.add("active")
      }
      if (dots[index]) {
        dots[index].classList.add("active")
      }

      currentSlide = index
    }

    // Function to go to next slide
    function nextSlide() {
      const nextIndex = (currentSlide + 1) % slides.length
      showSlide(nextIndex)
    }

    // Function to go to previous slide
    function prevSlide() {
      const prevIndex = (currentSlide - 1 + slides.length) % slides.length
      showSlide(prevIndex)
    }

    // Auto-slide functionality
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 4000) // Change slide every 4 seconds
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval)
    }

    // Event listeners for navigation
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      nextSlide()
      stopAutoSlide()
      setTimeout(startAutoSlide, 8000) // Restart auto-slide after 8 seconds
    })

    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      prevSlide()
      stopAutoSlide()
      setTimeout(startAutoSlide, 8000)
    })

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation()
        showSlide(index)
        stopAutoSlide()
        setTimeout(startAutoSlide, 8000)
      })
    })

    // Click on gallery to advance to next slide
    gallery.addEventListener("click", (e) => {
      // Only advance if not clicking on navigation elements
      if (!e.target.closest(".gallery-nav") && !e.target.closest(".dot")) {
        nextSlide()
        stopAutoSlide()
        setTimeout(startAutoSlide, 8000)
      }
    })

    // Hover to pause auto-slide
    gallery.addEventListener("mouseenter", stopAutoSlide)
    gallery.addEventListener("mouseleave", startAutoSlide)

    // Keyboard navigation
    gallery.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide()
        stopAutoSlide()
        setTimeout(startAutoSlide, 8000)
      } else if (e.key === "ArrowRight") {
        nextSlide()
        stopAutoSlide()
        setTimeout(startAutoSlide, 8000)
      }
    })

    // Make gallery focusable for keyboard navigation
    gallery.setAttribute("tabindex", "0")

    // Start auto-slide
    startAutoSlide()

    // Initialize first slide
    showSlide(0)
  })
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Function to open Figma projects
function openFigmaProject(url) {
    // open in a new tab
    window.open(url, '_blank');
}