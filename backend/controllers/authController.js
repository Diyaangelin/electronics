const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Register with profilePic
exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const profilePicPath = req.file
            ? {
                  url: `/uploads/${req.file.filename}`,
                  uploadedAt: new Date(),
              }
            : null;
        const user = new User({
            email,
            username,
            password: hashedPassword,
            profilePic: profilePicPath,
        });
        await user.save();
        res.status(201).json({ message: "User registered", user });
    } catch (err) {
        console.error("❌ Error in register:", err.message);
        res.status(500).json({ error: "Registration failed" });
    }
};

// Login and return JWT
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password required" });
        }
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid email" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid password" });
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                profilePic: user.profilePic,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        res.json({ message: "Login successful", token, user });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};

// Verify token and return user info
exports.verifyToken = (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ valid: false, error: "Token missing or malformed" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ valid: true, user: decoded });
    } catch (err) {
        return res.status(401).json({ valid: false, error: "Invalid or expired token" });
    }
};

// Delete user account
exports.deleteUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token missing or malformed" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const deletedUser = await User.findByIdAndDelete(decoded.id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "Account deleted successfully" });
    } catch (err) {
        console.error("❌ Error deleting user:", err.message);
        res.status(500).json({ error: "Deletion failed" });
    }
};

// Send OTP
exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: "Email required" });
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // valid for 5 mins
        user.otp = { code: otpCode, expiresAt };
        await user.save();

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP code is: ${otpCode}. It will expire in 5 minutes.`,
        };
        await transporter.sendMail(mailOptions);
        res.json({ message: "OTP sent successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to send OTP" });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ error: "All fields required" });
        }
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });
        if (!user.otp || user.otp.code !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }
        if (user.otp.expiresAt < new Date()) {
            return res.status(400).json({ error: "OTP expired" });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = undefined;
        await user.save();
        res.json({ message: "Password reset successfully" });
    } catch (err) {
        res.status(500).json({ error: "Password reset failed" });
    }
};