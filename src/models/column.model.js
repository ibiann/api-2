import Joi from 'joi';
import { ObjectId } from "mongodb";
import { getDB } from '../config/mongodb';

// Define Board Collection
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20).trim(),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id) => {
    try {
      const result = await getDB()
        .collection(columnCollectionName)
        .findOne({ _id: ObjectId(id) });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB().collection(columnCollectionName).insertOne(value)
        console.log(result)

    } catch (error) {
        console.log(error)
    }
}

export const ColumnModel = { createNew, findOneById }