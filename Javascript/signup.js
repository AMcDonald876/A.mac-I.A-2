document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();

      //Clear previous error messages
      clearErrors();
      let isValid = true;

      //Validate Full Name ---
      const fullName = document.getElementById('full-name').value.trim();
      if (fullName === '') {
        showError('full-name', 'Full name is required.');
        isValid = false;
      }

      // Validate Date of Birth (must be at least 13 years old) 
      const dobInput = document.getElementById('dob').value;
      if (dobInput === '') {
        showError('dob', 'Date of birth is required.');
        isValid = false;
      } else {
        const birthDate = new Date(dobInput);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < 13) {
          showError('dob', 'You must be at least 13 years old to register.');
          isValid = false;
        }
      }

      // Validate Email Format 
      const email = document.getElementById('email').value.trim();
      if (email === '') {
        showError('email', 'Email address is required.');
        isValid = false;
      } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address.');
        isValid = false;
      }

      // Validate Username 
      const username = document.getElementById('username').value.trim();
      if (username === '') {
        showError('username', 'Username is required.');
        isValid = false;
      } else if (username.length < 3) {
        showError('username', 'Username must be at least 3 characters long.');
        isValid = false;
      }

      // Validate Password 
      const password = document.getElementById('password').value;
      if (password === '') {
        showError('password', 'Password is required.');
        isValid = false;
      } else if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters long.');
        isValid = false;
      }

      // If all valid, then it's a successful registration
      if (isValid) {
        window.location.href = 'login.html'; // Navigation after success
      }
    });
  }
});

// Helper function to validate email format
function isValidEmail(email) {
  // Simple regex for basic email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Helper function to display error below input
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.style.color = '#ff6b6b';
  errorElement.style.fontSize = '14px';
  errorElement.style.marginTop = '5px';
  errorElement.textContent = message;
  input.parentNode.appendChild(errorElement);
}

// Helper function to clear all error messages
function clearErrors() {
  const errors = document.querySelectorAll('.error-message');
  errors.forEach(el => el.remove());
}