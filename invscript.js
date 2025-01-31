document.getElementById('signup-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Basic validation
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  // File validation
  const governmentId = document.getElementById('government-id').files[0];
  if (governmentId) {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    if (!validTypes.includes(governmentId.type)) {
      alert('Invalid file type! Only PDF, JPG, and PNG are allowed.');
      return;
    }

    if (governmentId.size > maxSize) {
      alert('File size exceeds the 5MB limit!');
      return;
    }
  } else {
    alert('Please upload your government ID!');
    return;
  }

  // Collect form data
  const formData = {
    fullName: document.getElementById('full-name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    occupation: document.getElementById('occupation').value,
    company: document.getElementById('company').value,
    linkedin: document.getElementById('linkedin').value,
    governmentId: governmentId,
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
      } 
    catch (err) {
        alert('Error submitting form');
      }
}

// Call the function when needed
signupUser(formData);

  // Redirect to main platform
  window.location.href = 'mainfeed.html';
});
function login() {
  alert('Redirecting to Login Page...');
  window.location.href = 'profile.html'; // Redirect to the login page
}