import { StatusCodes } from 'http-status-codes';
import { cardService } from '~/services/cardService';

const createNew = async (req, res, next) => {
  try {
    const createBoard = await cardService.createNew(req.body);
    res.actionResponse('create', createBoard, null, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};

export const cardController = {
  createNew
};
