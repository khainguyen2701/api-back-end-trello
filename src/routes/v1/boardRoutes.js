import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardController } from '~/controllers';
import { boardValidation } from '~/validations';

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
  .post(boardValidation.createNew, boardController.createNew);

router.route('/:boardId').get(boardController.getOneBoardById);

export const boardRoutes = router;
