// script.js

// Wait for EmailJS library to load before initializing
function initializeApp() {
	// Initialize EmailJS with your public key
	emailjs.init("s6i8i7zTEYmrDpHLw"); // Replace with your actual public key from EmailJS

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

	if (hamburger && navLinksContainer) {
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
	}

	// Form submission with EmailJS
	const contactForm = document.querySelector(".contact-form form");
	if (contactForm) {
		contactForm.addEventListener("submit", function (e) {
			e.preventDefault();

			// Get form data with fallback values
			const nameInput = this.querySelector('input[type="text"]');
			const emailInput = this.querySelector('input[type="email"]');
			const phoneInput = this.querySelector('input[type="tel"]');
			const messageInput = this.querySelector("textarea");

			const name = nameInput ? nameInput.value : "";
			const email = emailInput ? emailInput.value : "";
			const phone = phoneInput ? phoneInput.value : "";
			const message = messageInput ? messageInput.value : "";

			// Simple validation
			if (!name || !email || !message) {
				alert("Vänligen fyll i alla obligatoriska fält.");
				return;
			}

			// Get submit button for visual feedback
			const submitBtn = this.querySelector('button[type="submit"]');
			if (!submitBtn) return;

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
			console.log("Attempting to send email with params:", templateParams);
			console.log("Service ID:", "service_493cqki");
			console.log("Template ID:", "template_u2rfk19");

			emailjs
				.send(
					"service_493cqki", // Replace with your EmailJS service ID
					"template_u2rfk19", // Replace with your EmailJS template ID
					templateParams
				)
				.then(
					function (response) {
						// Success
						console.log("EmailJS success:", response);
						alert("Tack för ditt meddelande! Vi återkommer så snart som möjligt.");
						contactForm.reset();
						submitBtn.textContent = originalText;
						submitBtn.disabled = false;
					},
					function (error) {
						// Error
						console.error("EmailJS error details:", error);
						console.error("Error status:", error.status);
						console.error("Error text:", error.text);
						alert(
							"Det uppstod ett fel när meddelandet skulle skickas. Vänligen försök igen senare eller kontakta oss direkt. Fel: " + (error.status || error.text || "Okänt fel")
						);
						submitBtn.textContent = originalText;
						submitBtn.disabled = false;
					}
				)
				.catch(function (catchError) {
					// Catch any other errors
					console.error("EmailJS catch error:", catchError);
					alert("Ett oväntat fel uppstod. Vänligen försök igen senare.");
					submitBtn.textContent = originalText;
					submitBtn.disabled = false;
				});
		});
	}
}

// Wait for DOM to be ready and EmailJS library to load
document.addEventListener("DOMContentLoaded", function () {
	// Check if emailjs is available, if not wait for it
	if (typeof emailjs !== "undefined") {
		initializeApp();
	} else {
		// Wait for emailjs to load (with timeout)
		let attempts = 0;
		const maxAttempts = 50; // 5 seconds with 100ms intervals
		const waitForEmailJS = setInterval(function () {
			attempts++;
			if (typeof emailjs !== "undefined") {
				clearInterval(waitForEmailJS);
				initializeApp();
			} else if (attempts >= maxAttempts) {
				clearInterval(waitForEmailJS);
				console.error("EmailJS library failed to load after 5 seconds");
				alert("Kontaktformuläret är inte tillgängligt för tillfället. Vänligen försök igen senare.");
			}
		}, 100);
	}
});
