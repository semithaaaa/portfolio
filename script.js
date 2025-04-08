document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Initialize particle background
  initParticleBackground()

  // Show welcome popup after 2 seconds
  setTimeout(() => {
    const welcomePopup = document.getElementById("welcome-popup")
    welcomePopup.classList.remove("hidden")
    welcomePopup.classList.add("visible")
  }, 2000)

  // Close welcome popup
  document.getElementById("close-popup").addEventListener("click", closePopup)
  document.getElementById("explore-button").addEventListener("click", closePopup)
  document.getElementById("welcome-popup").addEventListener("click", function (e) {
    if (e.target === this) {
      closePopup()
    }
  })

  // Mobile menu toggle
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const mobileCloseButton = document.querySelector(".mobile-close-button")
  const mobileNav = document.querySelector(".mobile-nav")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  mobileMenuButton.addEventListener("click", () => {
    mobileNav.classList.remove("hidden")
    setTimeout(() => {
      mobileNav.classList.add("visible")
    }, 10)
  })

  mobileCloseButton.addEventListener("click", closeMobileMenu)

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  // Theme toggle
  const themeToggle = document.querySelector(".theme-toggle")
  themeToggle.addEventListener("click", toggleTheme)

  // Tabs
  const tabButtons = document.querySelectorAll(".tab-button")
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab")

      // Remove active class from all buttons and contents
      document.querySelectorAll(".tab-button").forEach((btn) => {
        btn.classList.remove("active")
      })

      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active")
      })

      // Add active class to clicked button and corresponding content
      button.classList.add("active")
      document.getElementById(`${tabId}-tab`).classList.add("active")
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Active section highlighting on scroll
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""
    const headerHeight = document.querySelector(".header").offsetHeight

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100
      const sectionHeight = section.offsetHeight

      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Contact form submission
  const contactForm = document.getElementById("contact-form")
  const formStatus = document.getElementById("form-status")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    // Validate form data
    if (!name || !email || !subject || !message) {
      showFormStatus("error", "All fields are required")
      return
    }

    // Simulate form submission
    setTimeout(() => {
      // In a real application, you would send the data to a server here
      console.log("Form data:", { name, email, subject, message })

      // Show success message
      showFormStatus("success", "Message sent successfully!")

      // Reset form
      contactForm.reset()
    }, 1000)
  })

  // Functions
  function closePopup() {
    const welcomePopup = document.getElementById("welcome-popup")
    welcomePopup.classList.remove("visible")
    setTimeout(() => {
      welcomePopup.classList.add("hidden")
    }, 300)
  }

  function closeMobileMenu() {
    mobileNav.classList.remove("visible")
    setTimeout(() => {
      mobileNav.classList.add("hidden")
    }, 300)
  }

  function toggleTheme() {
    document.body.classList.toggle("light-theme")
    localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark")
  }

  function showFormStatus(type, message) {
    formStatus.textContent = message
    formStatus.classList.remove("hidden", "success", "error")
    formStatus.classList.add(type)

    // Hide the status message after 5 seconds
    setTimeout(() => {
      formStatus.classList.add("hidden")
    }, 5000)
  }

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    document.body.classList.add("light-theme")
  }
})

// Particle Background
function initParticleBackground() {
  const canvas = document.getElementById("particle-canvas")
  const ctx = canvas.getContext("2d")

  // Set canvas dimensions
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  window.addEventListener("resize", resizeCanvas)
  resizeCanvas()

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 0.5
      this.speedX = (Math.random() - 0.5) * 0.5
      this.speedY = (Math.random() - 0.5) * 0.5
      this.color = `rgba(0, ${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 155}, ${Math.random() * 0.5 + 0.1})`
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x > canvas.width) this.x = 0
      else if (this.x < 0) this.x = canvas.width

      if (this.y > canvas.height) this.y = 0
      else if (this.y < 0) this.y = canvas.height
    }

    draw() {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Create particles
  const particles = []
  const numberOfParticles = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000))

  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle())
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()
    }

    // Draw connections
    connectParticles()

    requestAnimationFrame(animate)
  }

  // Connect particles with lines
  function connectParticles() {
    const maxDistance = 150

    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x
        const dy = particles[a].y - particles[b].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance
          ctx.strokeStyle = `rgba(0, ${Math.floor(Math.random() * 50) + 200}, ${Math.floor(Math.random() * 50) + 200}, ${opacity * 0.2})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(particles[a].x, particles[a].y)
          ctx.lineTo(particles[b].x, particles[b].y)
          ctx.stroke()
        }
      }
    }
  }

  animate()
}
