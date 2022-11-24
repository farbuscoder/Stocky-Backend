const res = require("express/lib/response");
const { ObjectId } = require("mongodb");

const { Database } = require("../database/index");

const { ProductsUtils } = require("./utils");

const COLLECTION = "products";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: ObjectId(id) });
};

const getByCategory = async (category) => {
  const collection = await Database(COLLECTION);
  return collection.find({ Categoria: category }).toArray();
};

const getByBrand = async (brand) => {
  const collection = await Database(COLLECTION);
  return collection.find({ Marca: brand }).toArray();
};

const getByQty = async (qty) => {
  const collection = await Database(COLLECTION);
  return collection.find({ Cantidad: { $lt: qty } }).toArray();
};

const getByPrice = async (price) => {
  const collection = await Database(COLLECTION);
  return collection.find({ Precio: { $lt: price } }).toArray();
};

const create = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product);
  return result.insertedId;
};

//Update

const modify = async (id, product) => {
  const collection = await Database(COLLECTION);
  return collection.updateOne({ _id: ObjectId(id) }, { $set: product });
};

//Delete

const deleteById = async (id, product) => {
  const collection = await Database(COLLECTION);
  return collection.deleteOne({ _id: ObjectId(id) }, { product });
};

const generateReport = async (name, res) => {
  let products = await getAll();
  ProductsUtils.excelGenerator(products, name, res);
};

module.exports.ProductsService = {
  getAll,
  getById,
  getByCategory,
  getByBrand,
  getByQty,
  getByPrice,
  create,
  generateReport,
  modify,
  deleteById,
};
