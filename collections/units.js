import mongoose from 'mongoose';
import { collectionNames } from './utils.js';

const { Schema } = mongoose;

export const model = collectionNames.unit;
export const schema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

schema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Data
export default [
  {
    id: '507f191e810c19729de861ea',
    name: 'יחידה 1',
  },
  {
    id: '507f191e810c19729de863ea',
    name: 'יחידת פסיכולוגים',
  },
  {
    id: '507f191e810c19729de862ea',
    name: 'יחידה 2',
  },
];
