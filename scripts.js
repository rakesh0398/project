document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Clear previous errors and reset input borders
    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('rememberMeError').textContent = '';
    document.getElementById('responseMessage').textContent = '';
    document.getElementById('responseMessage').className = '';
    document.getElementById('username').classList.remove('error-border');
    document.getElementById('password').classList.remove('error-border');

    // Get form values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;

    // Client-side validations
    let isValid = true;

    if (!username || !validateEmail(username)) {
        document.getElementById('usernameError').textContent = 'Please enter a valid email.';
        document.getElementById('username').classList.add('error-border');
        isValid = false;
    }

    if (!password || password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
        document.getElementById('password').classList.add('error-border');
        isValid = false;
    }

    if (!rememberMe) {
        document.getElementById('rememberMeError').textContent = 'You must agree to remember me.';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Show loading spinner
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('responseMessage').textContent = '';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            document.getElementById('responseMessage').textContent = 'Login successful!';
            document.getElementById('responseMessage').classList.add('success');
            document.getElementById('loginForm').reset();
        } else {
            document.getElementById('responseMessage').textContent = 'Login failed. Please try again.';
            document.getElementById('responseMessage').classList.add('error');
        }
    } catch (error) {
        document.getElementById('responseMessage').textContent = 'An error occurred. Please try again.';
        document.getElementById('responseMessage').classList.add('error');
    } finally {
        document.getElementById('spinner').style.display = 'none';
    }

    if (rememberMe) {
        localStorage.setItem('username', username);
    } else {
        localStorage.removeItem('username');
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
});

// Check if username is stored in localStorage
window.addEventListener('load', function() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        document.getElementById('username').value = storedUsername;
        document.getElementById('rememberMe').checked = true;
    }
});
