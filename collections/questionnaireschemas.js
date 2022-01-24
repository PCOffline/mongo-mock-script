import { Schema } from 'mongoose';
import { collectionNames, TargetTypes } from '../utils';

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
    id: '507f1f77bcf86cd799439055',
    name: 'שאלון 1',
    targetTypes: ['MALSHAB'],
    questions: [
      {
        title: 'מה השם שלך?',
        type: 'OPEN',
        required: true,
        isShort: false,
      },
    ],
    nodes: [],
    updatedAt: '2021-05-10T12:00:07.996+00:00',
    createdAt: '2021-05-10T12:00:07.996+00:00',
    createdBy: '507f1f77bcf86cd799439031',
    updatedBy: '507f1f77bcf86cd799439031',
  },
  {
    id: '507f1f77bcf86cd799439056',
    name: 'שאלון 2',
    targetTypes: ['MALSHAB', 'INTERVIEWER'],
    questions: [
      {
        title: 'מה השם שלך?',
        type: 'OPEN',
        required: true,
        isShort: false,
      },
    ],
    nodes: ['1111'],
    updatedAt: '2021-05-10T12:00:07.996+00:00',
    createdAt: '2021-05-10T12:00:07.996+00:00',
    createdBy: '507f1f77bcf86cd799439031',
    updatedBy: '507f1f77bcf86cd799439031',
  },
  {
    id: '507f1f77bcf86cd799439444',
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
    updatedAt: '2021-05-10T12:00:07.996+00:00',
    createdAt: '2021-05-10T12:00:07.996+00:00',
    createdBy: '507f1f77bcf86cd799439031',
    updatedBy: '507f1f77bcf86cd799439031',
  },
];
