const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // مدل کاربر

const router = express.Router(); // این خطو اضافه کن

// مسیر ثبت‌نام کاربر
router.post("/register", async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "لطفاً همه فیلدها را پر کنید." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "ایمیل قبلاً ثبت شده است." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ message: "ثبت‌نام موفقیت‌آمیز بود.", token });
    } catch (error) {
        console.error("❌ خطای ثبت نام:", error);
        res.status(500).json({ message: "خطای سرور رخ داد." });
    }
});

module.exports = router; // خروجی گرفتن از router
