import mongoose from 'mongoose';
import { collectionNames } from './utils.js';

const { Schema } = mongoose;

export const model = collectionNames.nodeGroup;
export const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    unitId: {
      type: String,
      required: true,
      index: true,
    },
    usersIds: [
      {
        type: Schema.Types.ObjectId,
        ref: collectionNames.user,
      },
    ],
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
    id: '507f1f77bcf86cd799439055',
    name: 'מסלול רגיל',
    unitId: '507f191e810c19729de861ea',
    usersIds: ['507f1f77bcf86cd799439033', '507f1f77bcf86cd799439022'],
  },
  {
    id: '507f1f77bcf86cd799439054',
    name: 'מסלול אש',
    unitId: '507f191e810c19729de861ea',
    usersIds: [
      '507f1f77bcf86cd799439012',
      '507f1f77bcf86cd799439013',
      '507f1f77bcf86cd799439021',
    ],
  },
  {
    id: '507f1f77bcf86cd799439057',
    name: 'מסלול פסיכולוגים',
    unitId: '507f191e810c19729de863ea',
    usersIds: [
      '507f1f77bcf86cd799439024',
      '507f1f77bcf86cd799411111',
      '507f1f77bcf86cd799439029',
      '507f1f77bcf86cd799439031',
    ],
  },
  {
    id: '507f1f77bcf86cd799439058',
    name: 'מסלול פסיכולוגים שני',
    unitId: '507f191e810c19729de863ea',
    usersIds: ['507f1f77bcf86cd799439024'],
  },
];
