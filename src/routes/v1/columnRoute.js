import express from 'express';
import { columnController } from '~/controllers/columnController';
import { columnValidation } from '~/validations';

const router = express.Router();

router.route('/').post(columnValidation.createNew, columnController.createNew);

export const columnRoutes = router;
