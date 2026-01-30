// script.js
// Initialize EmailJS with your public key
emailjs.init("PUBLIC_KEY"); // Replace with your actual public key from EmailJS

document.addEventListener("DOMContentLoaded", function () {
	// Smooth scrolling for navigation links
	const navLinks = document.querySelectorAll('a[href^="#"]');
	navLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			const targetId = this.getAttribute("href");
			const targetSection = document.querySelector(targetId);
			if (targetSection) {
				targetSection.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		});
	});

	// Mobile menu toggle
	const hamburger = document.querySelector(".hamburger");
	const navLinksContainer = document.querySelector(".nav-links");

	hamburger.addEventListener("click", function () {
		navLinksContainer.classList.toggle("active");
		hamburger.classList.toggle("active");
	});

	// Close mobile menu when clicking on a link
	const mobileNavLinks = document.querySelectorAll(".nav-link");
	mobileNavLinks.forEach((link) => {
		link.addEventListener("click", function () {
			navLinksContainer.classList.remove("active");
			hamburger.classList.remove("active");
		});
	});

	// Form submission with EmailJS
	const contactForm = document.querySelector(".contact-form form");
	contactForm.addEventListener("submit", function (e) {
		e.preventDefault();

		// Get form data
		const name = this.querySelector('input[type="text"]').value;
		const email = this.querySelector('input[type="email"]').value;
		const phone = this.querySelector('input[type="tel"]').value;
		const message = this.querySelector("textarea").value;

		// Simple validation
		if (!name || !email || !message) {
			alert("Vänligen fyll i alla obligatoriska fält.");
			return;
		}

		// Get submit button for visual feedback
		const submitBtn = this.querySelector('button[type="submit"]');
		const originalText = submitBtn.textContent;
		submitBtn.textContent = "Skickar...";
		submitBtn.disabled = true;

		// Prepare template parameters
		const templateParams = {
			from_name: name,
			from_email: email,
			phone_number: phone,
			message: message,
			to_email: "info@asarfastighetsservice.se", // Your company email
		};

		// Send email using EmailJS
		emailjs
			.send(
				"SERVICE_ID", // Replace with your EmailJS service ID
				"TEMPLATE_ID", // Replace with your EmailJS template ID
				templateParams
			)
			.then(
				function (response) {
					// Success
					alert("Tack för ditt meddelande! Vi återkommer så snart som möjligt.");
					contactForm.reset();
					submitBtn.textContent = originalText;
					submitBtn.disabled = false;
				},
				function (error) {
					// Error
					console.error("EmailJS error:", error);
					alert(
						"Det uppstod ett fel när meddelandet skulle skickas. Vänligen försök igen senare eller kontakta oss direkt."
					);
					submitBtn.textContent = originalText;
					submitBtn.disabled = false;
				}
			);
	});
});
