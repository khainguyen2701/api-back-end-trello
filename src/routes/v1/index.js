import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardRoutes } from './boardRoutes';
import { columnRoutes } from './columnRoute';
import { cardRoutes } from './cardRoute';

const router = express.Router();

router.get('/status', async (req, res) => {
  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Server is running!'
  });
});

router.use('/boards', boardRoutes);
router.use('/columns', columnRoutes);
router.use('/cards', cardRoutes);

export const APIs_v1 = router;
