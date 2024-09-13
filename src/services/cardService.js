import { cardModel, columnModel } from '~/models';

/* eslint-disable no-useless-catch */
const createNew = async (body) => {
  try {
    const newBody = {
      ...body
    };

    const createCard = await cardModel.createNew(newBody);

    const getOneCard = await cardModel.findOneById(createCard.insertedId);

    if (getOneCard) {
      await columnModel.pushCardIds(getOneCard);
    }

    return getOneCard;
  } catch (error) {
    throw error;
  }
};
export const cardService = {
  createNew
};
