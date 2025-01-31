document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;
  
    // Perform login validation (e.g., check credentials)
    if (username && password) {
      alert(`Welcome back, ${username}!`);
      // Redirect to the dashboard or home page
      // window.location.href = 'dashboard.html';
    } else {
      alert('Please enter your username and password.');
    }
  });

  function login() {
    alert('Redirecting to Login Page...');
    window.location.href = 'profile.html'; // Redirect to the login page
  }