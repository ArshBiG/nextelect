const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { name, familyName, phone, password } = req.body;

    // چک کردن مقداردهی صحیح
    if (!name || !familyName || !phone || !password) {
      return res.status(400).json({ message: "همه فیلدها الزامی هستند." });
    }

    // چک کردن کاربر تکراری
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "این شماره موبایل قبلاً ثبت شده است." });
    }

    // رمزگذاری پسورد
    const hashedPassword = await bcrypt.hash(password, 10);

    // ذخیره در دیتابیس
    const newUser = new User({ name, familyName, phone, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "ثبت‌نام با موفقیت انجام شد!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "مشکلی در ثبت‌نام رخ داد." });
  }
};

module.exports = { registerUser };
