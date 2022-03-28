import mongoose from 'mongoose';
import { collectionNames, TargetTypes } from './utils.js';

const { Schema } = mongoose;

export const model = collectionNames.questionnaireSchema;
export const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    questions: Schema.Types.Array,
    targetTypes: {
      type: [String],
      enum: Object.values(TargetTypes),
      required: true,
    },
    nodes: [String],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: collectionNames.user,
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: collectionNames.user,
      required: true,
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
    _id: '507f1f77bcf86cd799439055',
    name: 'שאלון 1',
    targetTypes: ['CANDIDATE'],
    questions: [
      {
        title: 'מה השם שלך?',
        type: 'OPEN',
        required: true,
        isShort: false,
      },
    ],
    nodes: [],
    createdBy: '507f1f77bcf86cd799439031',
    updatedBy: '507f1f77bcf86cd799439031',
  },
  {
    _id: '507f1f77bcf86cd799439056',
    name: 'שאלון 2',
    targetTypes: ['CANDIDATE', 'INTERVIEWER'],
    questions: [
      {
        title: 'מה השם שלך?',
        type: 'OPEN',
        required: true,
        isShort: false,
      },
    ],
    nodes: ['1111'],
    createdBy: '507f1f77bcf86cd799439031',
    updatedBy: '507f1f77bcf86cd799439031',
  },
  {
    _id: '507f1f77bcf86cd799439444',
    targetTypes: ['PSYCHOLOGIST', 'INTERVIEWER_PSYCHOLOGIST'],
    name: 'דוגמה למד"ה',
    questions: [
      {
        title: 'מה השם שלך?',
        type: 'OPEN',
        required: true,
        isShort: false,
      },
      {
        title: 'כמה אתה צהוב?',
        type: 'LINEAR_SCALE',
        required: true,
        min: {
          tag: 'קצת',
          value: 0,
        },
        max: {
          tag: 'הרבה',
          value: 5,
        },
      },
      {
        title: 'כמה אתה מתרגש לראיין עכשיו?',
        type: 'MULTIPLE_CHOICE',
        required: true,
        options: ['קצת', 'במידה בינונית', 'במידה רבה'],
        hasOther: true,
      },
      {
        title: 'כמה אתה ממש מתרגש לראיין עכשיו?',
        type: 'CHECKBOX',
        hasOther: true,
        required: true,
        options: ['קצת', 'במידה בינונית', 'במידה רבה'],
      },
      {
        title: 'מה התאריך היום?',
        type: 'DATE',
        required: true,
      },
    ],
    nodes: ['5544'],
    createdBy: '507f1f77bcf86cd799439031',
    updatedBy: '507f1f77bcf86cd799439031',
  },
];
