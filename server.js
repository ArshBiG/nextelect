require("dotenv").config();

const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.send("backend running!")
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))



connectDB();

// Routes
// app.use('/api/auth', authRoutes);
app.get("/api/auth/test", (req, res) => {
    res.json({ message: "✅ بک‌اند درست کار می‌کند!" });
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
    console.log(`Server Running on port : ${PORT}`))