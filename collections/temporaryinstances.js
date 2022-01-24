import { Schema } from 'mongoose';
import { collectionNames, TargetTypes } from '../utils';

export const model = collectionNames.temporaryInstance;
export const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    questions: {
      type: [],
      required: true,
    },
    target: {
      role: {
        type: String,
        enum: Object.values(TargetTypes),
        required: true,
      },
      targetId: {
        type: Schema.Types.ObjectId,
        ref: collectionNames.user,
        required: true,
      },
    },
    schemaId: {
      type: Schema.Types.ObjectId,
      ref: collectionNames.questionnaireSchema,
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: collectionNames.event,
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
    id: '507f1f77bcf86cd799439333',
    questions: [
      {
        title: 'מה השם שלך?',
        type: 'OPEN',
        required: true,
        answer: 'שם יפה',
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
        answer: 3,
      },
      {
        title: 'כמה אתה מתרגש לראיין עכשיו?',
        type: 'MULTIPLE_CHOICE',
        required: true,
        options: ['קצת', 'במידה בינונית', 'במידה רבה'],
        hasOther: true,
        answer: '4',
      },
      {
        title: 'כמה אתה ממש מתרגש לראיין עכשיו?',
        type: 'CHECKBOX',
        required: true,
        hasOther: true,
        options: ['קצת', 'במידה בינונית', 'במידה רבה'],
        answer: ['במידה רבה', '5'],
      },
      {
        title: 'מה התאריך היום?',
        type: 'DATE',
        required: true,
        answer: '2021-07-11T07:43:52.416Z',
      },
    ],
    name: 'דוגמה למד"ה',
    createdBy: '507f1f77bcf86cd799439024',
    updatedBy: '507f1f77bcf86cd799439024',
    createdAt: '2021-08-31T13:48:48.673Z',
    updatedAt: '2021-08-31T13:48:48.673Z',
    target: {
      role: 'DIAGNOSER',
      targetId: '507f1f77bcf86cd799439029',
    },
    schemaId: '60eaa138cdb7184b5c9c48d7',
    eventId: '123abc1e810c19729de872eb',
  },
];
