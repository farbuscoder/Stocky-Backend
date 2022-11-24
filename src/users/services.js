const res = require("express/lib/response");
const { ObjectId } = require("mongodb");

const { Database } = require("../database/index");

const COLLECTION = "users";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: ObjectId(id) });
};

const create = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product);
  return result.insertedId;
};

//Update

const modById = async (id, user) => {
  const collection = await Database(COLLECTION);
  return collection.updateOne({ _id: ObjectId(id) }, { $set: user });
};

//Delete
const deleteById = async (id, product) => {
  const collection = await Database(COLLECTION);
  return collection.deleteOne({ _id: ObjectId(id) }, { product });
};

module.exports.UsersService = {
  getAll,
  getById,
  create,
  deleteById,
  modById,
};
