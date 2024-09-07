import Joi from 'joi';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from './validators';
import { getDatabase } from '~/config/mongodb';

const BOARD_COLLECTION_NAME = 'boards';
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(30).trim().strict(),
  description: Joi.string().required().min(3).max(300).trim().strict(),
  slug: Joi.string().required().min(3).max(30).strict(),
  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(Date.now()),
  _destroy: Joi.boolean().default(false) // giá trị xác định bản ghi có được xoá chưa
});

const createNew = async (data) => {
  try {
    const createBoard = await getDatabase()
      .collection(BOARD_COLLECTION_NAME)
      .insertOne(data);

    return createBoard;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    const findOneById = await getDatabase()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({
        _id: id
      });
    return findOneById;
  } catch (error) {
    throw new Error(error);
  }
};

export const boardModel = {
  boardCollectionSchema,
  BOARD_COLLECTION_NAME,
  createNew,
  findOneById
};
