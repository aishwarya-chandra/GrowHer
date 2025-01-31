// Sign Up as Investor or Business
function signUpAs(role) {
    alert(`You are signing up as a ${role}. Redirecting to ${role} signup form...`);
  
    // Redirect to the respective signup page
    if (role === 'Investor') {
      window.location.href = 'investor.html'; // Replace with your actual investor signup page
    } else if (role === 'Business') {
      window.location.href = 'business.html'; // Replace with your actual business signup page
    }
  }
  
  // Redirect to Login Page
  function login() {
    alert('Redirecting to Login Page...');
    window.location.href = 'login.html'; // Redirect to the login page
  }