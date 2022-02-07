import mongoose from 'mongoose';
import { collectionNames } from './utils.js';

const { Schema } = mongoose;

export const model = collectionNames.event;
export const schema = new Schema(
  {
    node: {
      id: {
        type: String,
      },
      name: {
        type: String,
        required: true,
      },
    },
    malshabShort: {
      id: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    time: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    interviewersIds: [
      {
        type: Schema.Types.ObjectId,
        ref: collectionNames.user,
      },
    ],
    url: String,
    results: {
      notes: [
        {
          wroteBy: {
            type: Schema.Types.ObjectId,
            ref: collectionNames.user,
          },
          prevWroteBy: {
            type: Schema.Types.ObjectId,
            ref: collectionNames.user,
          },
          note: String,
        },
      ],
      questionnaire: [
        {
          createdBy: Schema.Types.ObjectId,
          questionnaireInstanceId: {
            type: Schema.Types.ObjectId,
            ref: collectionNames.questionnaireInstance,
          },
          creatorType: String,
        },
      ],
      videoUrl: String,
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

schema.virtual('nodeData', {
  ref: collectionNames.node,
  localField: 'node.id',
  foreignField: 'id',
  justOne: true,
});

// Data
export default [
  {
    _id: '123abc1e810c19729de872eb',
    node: {
      id: '5544',
      name: 'שלב מסווג',
    },
    malshabShort: {
      id: '222222222',
      firstName: 'נועה',
      lastName: 'קירל',
    },
    time: `${new Date().toISOString().slice(0, 10)}T12:30:07.996+00:00`,
    location: '10005126',
    interviewersIds: ['507f1f77bcf86cd799439024', '507f1f77bcf86cd799411111'],
    url: 'http://sample.com',
    results: {
      notes: [
        {
          wroteBy: '507f1f77bcf86cd799439029',
          note: 'יפה יפה',
        },
        {
          wroteBy: '507f1f77bcf86cd799439024',
          prevWroteBy: '507f1f77bcf86cd799439029',
          note: '666666',
        },
      ],
      questionnaire: [
        {
          createdBy: '507f1f77bcf86cd799439029',
          questionnaireInstanceId: '507f1f77bcf86cd799439333',
          creatorType: 'DIAGNOSER',
        },
        {
          createdBy: '507f1f77bcf86cd799439024',
          questionnaireInstanceId: '6193aa3f3cc7724ed26138d8',
          creatorType: 'PSYCHOLOGIST',
        },
      ],
    },
  },
  {
    _id: '123abc1e810c19729de872ec',
    node: {
      id: '4457',
      name: 'שלב סודי',
    },
    malshabShort: {
      id: '999999999',
      firstName: 'דנה',
      lastName: 'זרמון',
    },
    time: `${new Date().toISOString().slice(0, 10)}T10:30:07.996+00:00`,
    location: '10005126',
    interviewersIds: ['507f1f77bcf86cd799439024'],
    url: 'http://sample.com',
    results: {
      notes: [
        {
          wroteBy: '507f1f77bcf86cd799439024',
          note: 'הערההההה',
        },
      ],
    },
  },
  {
    _id: '123abc1e810c19729de872ed',
    node: {
      id: '8888',
      name: 'שלב של תמר',
    },
    malshabShort: {
      id: '999999999',
      firstName: 'דנה',
      lastName: 'זרמון',
    },
    time: `${new Date().toISOString().slice(0, 10)}T15:30:07.996+00:00`,
    location: '10005126',
    interviewersIds: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],
    url: 'http://sample.com',
    results: {},
  },
  {
    _id: '123abc1e810c19729de872ee',
    node: {
      id: '5555',
      name: 'שלב של ולדי',
    },
    malshabShort: {
      id: '999999999',
      firstName: 'דנה',
      lastName: 'זרמון',
    },
    time: `${new Date().toISOString().slice(0, 10)}T15:30:07.996+00:00`,
    location: '10005126',
    interviewersIds: ['507f1f77bcf86cd799439033'],
    url: 'http://sample.com',
    results: {
      notes: [
        {
          wroteBy: '507f1f77bcf86cd799439033',
          note: 'אחלה עבודה',
        },
      ],
    },
  },
  {
    _id: '123abc1e810c19729de872ef',
    node: {
      id: '8897',
      name: 'שלב פיסי אדום',
    },
    malshabShort: {
      id: '555555555',
      firstName: 'ישראל',
      lastName: 'ישראלי',
    },
    time: `${new Date().toISOString().slice(0, 10)}T14:00:07.996+00:00`,
    location: 'not in mariv',
    interviewersIds: [],
    results: {},
  },
  {
    _id: '123abc1e810c19729de872e3',
    node: {
      id: '1111',
      name: 'שלב של כרמל',
    },
    malshabShort: {
      id: '333333333',
      firstName: 'חיים',
      lastName: 'כהן',
    },
    time: `${new Date().toISOString().slice(0, 10)}T09:00:07.996+00:00`,
    location: '10005126',
    interviewersIds: [],
    url: 'http://sample.com',
    results: {
      notes: [
        {
          wroteBy: '507f1f77bcf86cd799439033',
          note: 'יפה יפה',
        },
      ],
      questionnaire: [],
    },
  },
];
