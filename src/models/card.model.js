import Joi from 'joi';
import { ObjectId } from "mongodb";
import { getDB } from '../config/mongodb';

// Define Board Collection
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20).trim(),
    cover: Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) => {
    return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id) => {
    try {
      const result = await getDB()
        .collection(cardCollectionName)
        .findOne({ _id: ObjectId(id) });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB().collection(cardCollectionName).insertOne(value)
        console.log(result)

    } catch (error) {
        console.log(error)
    }
}

export const BoardModel = { createNew, findOneById }