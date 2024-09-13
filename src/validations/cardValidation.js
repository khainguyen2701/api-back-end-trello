import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import {
  ApiError,
  convertErrors,
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE
} from '~/utils';

const createNew = async (req, res, next) => {
  const schemaValidation = Joi.object({
    boardId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    columnId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict()
  });
  try {
    await schemaValidation.validateAsync(req.body, {
      abortEarly: false
    });
    next();
  } catch (error) {
    const errors = convertErrors(error?.details ?? []);
    const errorMessage = new Error(error).message;
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage,
      errors
    );
    next(customError);
  }
};
export const cardValidation = {
  createNew
};
