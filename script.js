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
})

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
  // Replace with actual Figma URLs when available
  console.log("Opening Figma project:", url)
  // window.open(url, '_blank')
  alert("Figma project link will be added here. URL: " + url)
}
