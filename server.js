const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // Use fs.promises for Promise-based file operations
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to update user information in data.json
app.post('/updateUserInfo', async (req, res) => {
    const userInfo = req.body;

    try {
        // Read current data from data.json
        let data = await fs.readFile(filePath, 'utf8');
        data = JSON.parse(data);

        // Update user information
        data.userInfo = userInfo;

        // Write updated data back to data.json
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

        res.json({ message: 'User information updated successfully' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to update user information' });
    }
});

// Endpoint to save new entry
app.post('/saveNewEntry', async (req, res) => {
    const entryData = req.body;

    try {
        const filePath = path.join(__dirname, 'data.json');
        let data = await fs.readFile(filePath, 'utf8');
        data = JSON.parse(data);

        // Append new entry to existing entries
        data.entries.push(entryData);

        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

        res.json({ message: 'Entry saved successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to save entry' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
