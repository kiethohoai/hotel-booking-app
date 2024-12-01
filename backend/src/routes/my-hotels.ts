import express, { Request, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Hotel from '../models/hotel';
import { vertifyToken } from '../middleware/auth';
import { body } from 'express-validator';
import { HotelType } from '../shared/type';

const router = express.Router();

/* Setup multer */
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1024, // 5MB
  },
});

/* api/my-hotels - CREATE HOTEL */
router.post(
  '/',
  vertifyToken,
  [
    body('name').notEmpty().withMessage(`Name is required`),
    body('city').notEmpty().withMessage(`City is required`),
    body('country').notEmpty().withMessage(`Country is required`),
    body('description').notEmpty().withMessage(`Description is required`),
    body('type').notEmpty().withMessage(`Hotel type is required`),

    body('adultCount')
      .notEmpty()
      .isNumeric()
      .withMessage(`Adult count is required and must be a number`),
    body('childCount')
      .notEmpty()
      .isNumeric()
      .withMessage(`Child count is required and must be a number`),
    body('pricePerNight')
      .notEmpty()
      .isNumeric()
      .withMessage(`Price per night is required and must be a number`),
    body('starRating')
      .notEmpty()
      .isNumeric()
      .withMessage(`Name is required and must be a number`),

    body('facilities')
      .notEmpty()
      .isArray()
      .withMessage(`Facilities is required`),
  ],
  // upload.array('imageFiles', 6),
  upload.any(),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // upload image to cloundinary, get image URL
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString('base64');
        let dataURI = `data:${image.mimetype};base64,${b64}`;
        const res = await cloudinary.uploader.upload(dataURI);
        return res.url;
      });
      const imageUrls = await Promise.all(uploadPromises);

      // Add all informations to newHotel Object
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      // save the newHotel to DB
      const hotel = new Hotel(newHotel);
      await hotel.save();

      // send back respone & hotel created
      res.status(201).send(hotel);
    } catch (error) {
      console.error(`🚀error while creating hotel:`, error);
      res.status(500).json({ message: `Something went wrong` });
    }
  },
);

router.get('/', vertifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels' });
  }
});

export default router;
