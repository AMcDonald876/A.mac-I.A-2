document.addEventListener('DOMContentLoaded', function () {
  // For The Login Form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      let isValid = true;

      // Validate username
      const username = document.getElementById('login-username').value.trim();
      if (!username) {
        showError('login-username', 'Username is required.');
        isValid = false;
      }

      // Validate password
      const password = document.getElementById('login-password').value;
      if (!password) {
        showError('login-password', 'Password is required.');
        isValid = false;
      }

      if (isValid) {
        alert('Login successful! Redirecting to home...');
        window.location.href = 'index.html';
      }
    });
  }
});

// Helper Functions
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const error = document.createElement('div');
  error.className = 'error-message';
  error.textContent = message;
  input.parentNode.appendChild(error);
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => el.remove());
}