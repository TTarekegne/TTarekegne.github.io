// ---------- Mobile Menu Toggle ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const allNavLinks = document.querySelectorAll('.nav-links a');

allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ---------- Contact Form Validation ----------
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameValue = document.getElementById('name').value.trim();
    const emailValue = document.getElementById('email').value.trim();
    const messageValue = document.getElementById('message').value.trim();

    if (nameValue === '' || emailValue === '' || messageValue === '') {
        showStatus('Please fill in all fields.', 'error');
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
    }

    // Data passed validation — now actually send it to Formspree
    showStatus('Sending...', '');

    fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(function (response) {
            if (response.ok) {
                showStatus('Thanks! Your message has been sent.', 'success');
                contactForm.reset();
            } else {
                showStatus('Oops! Something went wrong. Please try again.', 'error');
            }
        })
        .catch(function () {
            showStatus('Network error. Please check your connection and try again.', 'error');
        });
});

function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
}

// ---------- Auto-update footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
