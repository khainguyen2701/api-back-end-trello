import { StatusCodes } from 'http-status-codes';

const createNew = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      statusCode: StatusCodes.CREATED,
      message: 'POST Controller: Create from boards!'
    });
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew
};
