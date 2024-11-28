"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
/* LOGIN ROUTE (localhost:7000/api/auth/login) */
router.post(`/login`, [
    (0, express_validator_1.check)('email', 'Email is required').isEmail(),
    (0, express_validator_1.check)('password', 'Password with 6 or more characters required').isLength({
        min: 6,
    }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check errors from express validator
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ message: errors.array() });
        return;
    }
    // Get data from req.body
    const { email, password } = req.body;
    try {
        // Find user on DB & guard
        const user = yield user_1.default.findOne({ email: email });
        if (!user) {
            res.status(400).json({ message: `Invalid Credentials` });
            return;
        }
        // Check match password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: `Invalid Credentials` });
            return;
        }
        // Create jwt token
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1d',
        });
        // Send token via cookie
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000,
        });
        // Send res to client
        res.status(200).json({ userId: user._id });
    }
    catch (error) {
        console.error(`🚀error (/login):`, error);
        res.status(500).json({ message: `Something went wrong` });
    }
}));
// Check user login
router.get('/validate-token', auth_1.vertifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({ userId: req.userId });
}));
/* Logout */
router.post('/logout', (req, res) => {
    res.cookie('auth_token', '', {
        expires: new Date(0),
    });
    res.status(200).json({ message: `Signed Out Successfully` });
});
exports.default = router;
