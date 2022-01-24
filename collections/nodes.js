import { Schema } from 'mongoose';
import { collectionNames } from '../utils';

export const model = collectionNames.node;
export const schema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    type: {
      type: String,
      enum: NodeType,
      default: NodeType.Unknown,
    },
    nodeGroupId: {
      type: Schema.Types.ObjectId,
      ref: collectionNames.nodeGroup,
    },
    unitId: {
      type: Schema.Types.ObjectId,
      ref: collectionNames.unit,
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

schema.index({ name: 1, unitId: 1 }, { unique: true, sparse: true });

// Data
export default [
  {
    _id: '123abc1e810c19729de862ea',
    id: '5544',
    name: 'שלב מסווג',
    type: 'CLASSIFIED',
    unitId: '507f191e810c19729de863ea',
    nodeGroupId: '507f1f77bcf86cd799439057',
  },
  {
    _id: '123abc1e810c19729de862ff',
    id: '4457',
    name: 'שלב סודי',
    type: 'CLASSIFIED',
    unitId: '507f191e810c19729de863ea',
    nodeGroupId: '507f1f77bcf86cd799439058',
  },
  {
    _id: '334abc1e810c19729de862eb',
    id: '8888',
    name: 'שלב של תמר',
    type: 'INTERVIEW',
    unitId: '507f191e810c19729de861ea',
    nodeGroupId: '507f1f77bcf86cd799439054',
  },
  {
    _id: '234abc1e810c19729de8622c',
    id: '7777',
    name: 'שלב פיסי קל',
    type: 'PHYSICAL',
    unitId: '507f191e810c19729de861ea',
  },
  {
    _id: '134abc1e810c19729de862eb',
    id: '1365',
    name: 'שלב של במבינו',
    type: 'INTERVIEW',
    unitId: '507f191e810c19729de861ea',
  },
  {
    _id: '234abc1e810c19729fe862ed',
    id: '1234',
    name: 'שלב פיסי קשה',
    type: 'PHYSICAL',
    unitId: '507f191e810c19729de861ea',
  },
  {
    _id: '234abc1e810c19729de862ea',
    id: '5008',
    name: 'שלב מבחן יפה',
    type: 'EXAM',
    unitId: '507f191e810c19729de861ea',
    nodeGroupId: '507f1f77bcf86cd799439055',
  },
  {
    _id: 'a34abc1e810c19729de862eb',
    id: '8200',
    name: 'שלב של יוסי',
    type: 'INTERVIEW',
    unitId: '507f191e810c19729de861ea',
  },
  {
    _id: '234abc1e810c19729de852ec',
    id: '6587',
    name: 'שלב פיסי בינוני',
    type: 'PHYSICAL',
    unitId: '507f191e810c19729de861ea',
  },
  {
    _id: '124abc1e810c19729de862ea',
    id: '8747',
    name: 'שלב מבחן מיוחד',
    type: 'EXAM',
    unitId: '507f191e810c19729de861ea',
    nodeGroupId: '507f1f77bcf86cd799439055',
  },
  {
    _id: '234abc1e810c19729de862eb',
    id: '1111',
    name: 'שלב של כרמל',
    type: 'INTERVIEW',
    unitId: '507f191e810c19729de861ea',
    nodeGroupId: '507f1f77bcf86cd799439055',
  },
  {
    _id: '234abc1e810c19729de862ec',
    id: '8897',
    name: 'שלב פיסי אדום',
    type: 'PHYSICAL',
    unitId: '507f191e810c19729de861ea',
    nodeGroupId: '507f1f77bcf86cd799439054',
  },
  {
    _id: '234abc1e810c19729de862ed',
    id: '4747',
    name: 'שלב של יובל',
    type: 'INTERVIEW',
    unitId: '507f191e810c19729de861ea',
    nodeGroupId: '507f1f77bcf86cd799439055',
  },
  {
    _id: '234abc1e810c19729de862ee',
    id: '3636',
    name: 'שלב של דוד',
    type: 'INTERVIEW',
    unitId: '507f191e810c19729de861ea',
    nodeGroupId: '507f1f77bcf86cd799439054',
  },
  {
    _id: '234abc1e810c19729de862ef',
    id: '5555',
    name: 'שלב של ולדי',
    type: 'INTERVIEW',
    unitId: '507f191e810c19729de861ea',
    nodeGroupId: '507f1f77bcf86cd799439055',
  },
];
