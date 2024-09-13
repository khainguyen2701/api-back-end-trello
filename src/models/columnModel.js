import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDatabase } from '~/config/mongodb';
import {
  ApiError,
  convertStringToObjectId,
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE
} from '~/utils';

// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'columns';
const columnCollectionSchema = Joi.object({
  boardId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  cardOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
});

const validateBeforeCreate = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: true
  });
};

const createNew = async (body) => {
  try {
    const validate = await validateBeforeCreate(body);
    const convertBody = {
      ...validate,
      boardId: new ObjectId(validate.boardId)
    };
    const createColumn = await getDatabase()
      .collection(COLUMN_COLLECTION_NAME)
      .insertOne(convertBody);

    return createColumn;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    const findOneById = await getDatabase()
      .collection(COLUMN_COLLECTION_NAME)
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

const pushCardIds = async (card) => {
  try {
    const data = await getDatabase()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: convertStringToObjectId(card.columnId)
        },
        {
          $push: {
            cardOrderIds: convertStringToObjectId(card._id)
          }
        },
        { returnDocument: 'after' }
      );

    return data.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const columnModel = {
  COLUMN_COLLECTION_NAME,
  columnCollectionSchema,
  createNew,
  findOneById,
  pushCardIds
};
