import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

const router = express.Router();

/* REGISTER ROUTE (localhost:7000/api/users/register) */
router.post(
  `/register`,
  [
    check('firstName', 'First Name is required').isString(),
    check('firstName', 'First Name is required').isString(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with 6 or more characters required').isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
      return;
    }

    try {
      // find user in database
      let user = await User.findOne({
        email: req.body.email,
      });

      // return error if user already exists
      if (user) {
        res.status(400).json({ message: `User already exists` });
        return;
      }

      // No user with this data in DB, create & save user in DB (Hash Password in Middleware)
      user = new User(req.body);
      await user.save();

      // Create token from JWT
      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: '1d',
        },
      );

      // Send token via cookie
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      });

      // Send notify to client
      res.status(200).send({ message: `User Register Succesfully` });
    } catch (error) {
      console.error(`🚀error (register route):`, error);
      res.status(500).send({ message: `Something went wrong` });
    }
  },
);

/* Export router */
export default router;
