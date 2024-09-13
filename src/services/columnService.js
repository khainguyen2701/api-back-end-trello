import { boardModel, columnModel } from '~/models';

/* eslint-disable no-useless-catch */
const createNew = async (body) => {
  try {
    const newBody = {
      ...body
    };

    const createColumn = await columnModel.createNew(newBody);

    const getOneColumn = await columnModel.findOneById(createColumn.insertedId);
    if (getOneColumn) {
      getOneColumn.cards = [];
      await boardModel.pushColumnIds(getOneColumn);
    }

    return getOneColumn;
  } catch (error) {
    throw error;
  }
};
export const columnService = {
  createNew
};
