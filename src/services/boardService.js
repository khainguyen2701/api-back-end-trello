import { cloneDeep } from 'lodash';
import { boardModel } from '~/models';
import { convertStringToObjectId, slugify } from '~/utils';

/* eslint-disable no-useless-catch */

//must return value in services
const createNew = async (body) => {
  try {
    const newBody = {
      ...body,
      slug: slugify(body.title)
    };

    const createBoard = await boardModel.createNew(newBody);

    //Lấy 1 bản ghi dựa trên id đã tạo

    const getOneBoard = await boardModel.findOneById(createBoard.insertedId);

    return getOneBoard;
  } catch (error) {
    throw error;
  }
};

const getOneBoardById = async (boardId) => {
  try {
    const id = convertStringToObjectId(boardId);
    const board = await boardModel.getDetailBoard(id);

    const cloneDeepBoard = cloneDeep(board);
    cloneDeepBoard.columns.forEach((element) => {
      element.cards = cloneDeepBoard.cards.filter(
        (item) => item.columnId.toString() === element._id.toString()
      );
    });
    delete cloneDeepBoard.cards;

    return cloneDeepBoard;
  } catch (error) {
    throw error;
  }
};

const getListBoards = async () => {
  try {
    const boards = await boardModel.getAllBoards();
    return boards;
  } catch (error) {
    throw error;
  }
};
export const boardService = { createNew, getOneBoardById, getListBoards };
