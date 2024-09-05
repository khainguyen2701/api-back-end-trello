import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardValidation } from '~/validations/boardValidation';

const router = express.Router();

// Router cho boards
router
  .route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'GET: Hello from boards!'
    });
  })
  .post(boardValidation.createNew);

export const boardRoutes = router;
