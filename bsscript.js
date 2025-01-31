document.getElementById('business-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    // Basic validation
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    // Collect form data
    const formData = {
      businessName: document.getElementById('business-name').value,
      ownerName: document.getElementById('owner-name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      industry: document.getElementById('industry').value,
      businessType: document.getElementById('business-type').value,
      description: document.getElementById('description').value,
      website: document.getElementById('website').value,
      fundingGoal: document.getElementById('funding-goal').value,
      investmentType: document.getElementById('investment-type').value,
      businessStage: document.getElementById('business-stage').value,
      registrationCertificate: document.getElementById('registration-certificate').files[0],
      governmentId: document.getElementById('government-id').files[0],
      terms: document.getElementById('terms').checked,
    };
  async function signupUser(formData) {
    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message);
      console.log("Form Email:", formData.email);

      if (formData.email) {
        window.location.href = `profile.html?email=${encodeURIComponent(formData.email)}`;
      } else {
        console.error("Email is missing or undefined");
      }
    } catch (err) {
      alert('Error submitting form');
    }
  }
  
    // Redirect to main platform
    window.location.href = 'mainfeed.html';
  });
  function login() {
    alert('Redirecting to Login Page...');
    window.location.href = 'profile.html'; // Redirect to the login page
  }