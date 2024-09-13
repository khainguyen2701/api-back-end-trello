import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { getDatabase } from '~/config/mongodb';
import {
  ApiError,
  convertStringToObjectId,
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE
} from '~/utils';

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = 'cards';
const carCollectionSchema = Joi.object({
  boardId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),

  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
});

const validateBeforeCreate = async (data) => {
  return await carCollectionSchema.validateAsync(data, {
    abortEarly: true
  });
};

const createNew = async (body) => {
  try {
    const validate = await validateBeforeCreate(body);
    const convertBody = {
      ...validate,
      boardId: convertStringToObjectId(validate.boardId),
      columnId: convertStringToObjectId(validate.columnId)
    };
    const createCard = await getDatabase()
      .collection(CARD_COLLECTION_NAME)
      .insertOne(convertBody);

    return createCard;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    const findOneById = await getDatabase()
      .collection(CARD_COLLECTION_NAME)
      .findOne({
        _id: id
      });
    if (!findOneById) {
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'No data valid', []);
    }
    return findOneById;
  } catch (error) {
    throw new Error(error);
  }
};

export const cardModel = {
  CARD_COLLECTION_NAME,
  carCollectionSchema,
  createNew,
  findOneById
};
