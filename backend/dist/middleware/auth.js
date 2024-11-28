"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vertifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const vertifyToken = (req, res, next) => {
    // Get token & guard
    const token = req.cookies['auth_token'];
    if (!token) {
        res.status(401).json({ message: `unauthorized` });
        return;
    }
    try {
        // Check token created by own server
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.error(`🚀error (vertifyToken):`, error);
        res.status(401).json({ message: `unauthorized` });
    }
};
exports.vertifyToken = vertifyToken;
