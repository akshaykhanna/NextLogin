// Import necessary modules
const express = require('express');
const jwt = require('jsonwebtoken');

// Create an Express application
const app = express();

// Secret key for JWT
const secretKey = 'your_secret_key';

// In-memory database for users
let users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Middleware to parse JSON body
app.use(express.json());

// Route to handle user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user with given username and password
    const user = users.find(u => u.username === username && u.password === password);

    // If user is not found or password is incorrect, return 401 Unauthorized
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, secretKey);

    // Return the token
    res.json({ token });
});

// Route to get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Route to handle user registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if username is already taken
    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'Username is already taken' });
    }

    // Create new user
    const newUser = {
        id: users.length + 1,
        username,
        password
    };

    // Add the new user to the database
    users.push(newUser);

    // Generate JWT token for the new user
    const token = jwt.sign({ userId: newUser.id }, secretKey);

    // Return the token
    res.json({ token });
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
}

// Protected route, only accessible with valid token
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route. Token is valid.' });
});

// Start the server
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
