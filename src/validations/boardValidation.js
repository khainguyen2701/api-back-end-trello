import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { ApiError, convertErrors } from '~/utils';

const createNew = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(30).trim().strict().messages({
      'any.required': 'Title is required!',
      'string.trim': 'Title is not allowed to be empty!',
      'string.max': 'Title min 3 characters!',
      'string.min': 'Title max 30 characters!'
    }),
    description: Joi.string()
      .required()
      .min(3)
      .max(300)
      .trim()
      .strict()
      .messages({
        'any.required': 'Description is required!',
        'string.trim': 'Description is not allowed to be empty!',
        'string.max': 'Description min 3 characters!',
        'string.min': 'Description max 300 characters!'
      })
  });
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false
    });
    next();
  } catch (error) {
    // next(error);
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

export const boardValidation = {
  createNew
};
