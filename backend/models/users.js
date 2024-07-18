const mongoose = require("mongoose");

const collectionName = "users";
const schemaName = "users";
const SchemaTypes = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    _id: { type: SchemaTypes.ObjectId, auto: true },
    firstName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    startDate: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    salaryAmount: { type: Number, required: true, trim: true },
    selectedManager: { type: String, required: false, trim: true },
  },
  { strict: false, autoCreate: true, timestamps: true }
);

const model = mongoose.model(schemaName, schema, collectionName);

module.exports = model;
module.exports.schema = schema;
