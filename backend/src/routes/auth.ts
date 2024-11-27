import { check, validationResult } from 'express-validator';
import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { vertifyToken } from '../middleware/auth';

const router = express.Router();

/* LOGIN ROUTE (localhost:7000/api/auth/login) */
router.post(
  `/login`,
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with 6 or more characters required').isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    // Check errors from express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
      return;
    }

    // Get data from req.body
    const { email, password } = req.body;

    try {
      // Find user on DB & guard
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(400).json({ message: `Invalid Credentials` });
        return;
      }

      // Check match password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: `Invalid Credentials` });
        return;
      }

      // Create jwt token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
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
    } catch (error) {
      console.error(`🚀error (/login):`, error);
      res.status(500).json({ message: `Something went wrong` });
    }
  },
);

// Check user login
router.get('/validate-token', vertifyToken, async (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

/* Logout */
router.post('/logout', (req: Request, res: Response) => {
  res.cookie('auth_token', '', {
    expires: new Date(0),
  });

  res.status(200).json({ message: `Signed Out Successfully` });
});

export default router;
