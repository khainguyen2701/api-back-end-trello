import { StatusCodes } from 'http-status-codes';
import { columnService } from '~/services/columnService';

const createNew = async (req, res, next) => {
  try {
    const createBoard = await columnService.createNew(req.body);
    res.actionResponse('create', createBoard, null, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};

export const columnController = {
  createNew
};
