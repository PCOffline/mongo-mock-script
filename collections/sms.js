import mongoose from 'mongoose';
import { collectionNames, SmsTypes, SmsStatuses } from './utils.js';

const { Schema } = mongoose;

export const model = collectionNames.sms;
export const schema = new Schema(
  {
    target: {
      type: String,
      required: true,
    },
    sendTime: {
      type: Date,
      default: undefined,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: SmsTypes,
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: collectionNames.event,
      required: true,
    },
    delayCount: {
      type: Number,
      required: false,
    },
    twilioSid: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(SmsStatuses).map((status) => status.toUpperCase()),
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
    _id: '123abc1e810c19729de862ea',
    target: '222222222',
    message: 'נדחה ב5 דקות',
    delayCount: 5,
    type: 'DELAY',
    sendTime: `${new Date().toISOString().slice(0, 10)}T12:30:07.996+00:00`,
    eventId: '123abc1e810c19729de872eb',
    status: 'DELIVERED',
    twilioSid: 'SM3e9e1ab29977234ff3dcf6388a6d1d59',
  },
  {
    message:
      'מלש"ב יקר, יש לך ראיון מחר! אנא התייצב לראיון הנדרש כ-5 דקות מראש',
    _id: '123abc1e810c19729de864aa',
    target: '222222222',
    type: 'EVENT',
    sendTime: `${new Date().toISOString().slice(0, 10)}T12:00:01.996+00:00`,
    eventId: '123abc1e810c19729de872eb',
    status: 'DELIVERED',
    twilioSid: 'SMeafb5e299b5a8ada5977141f82cb09df',
  },
  {
    message:
      'מלש"ב יקר, יש לך ראיון מחר! אנא התייצב לראיון הנדרש כ-5 דקות מראש',
    _id: '123abc1e810c19729de864ab',
    target: '999999999',
    type: 'EVENT',
    sendTime: `${new Date().toISOString().slice(0, 10)}T14:00:01.996+00:00`,
    eventId: '123abc1e810c19729de872ed',
    status: 'UNDELIVERED',
    twilioSid: 'SM8a1d06cbf8a02494d75e503c4ae8a2b0',
  },
  {
    message:
      'מלש"ב יקר, יש לך ראיון מחר! אנא התייצב לראיון הנדרש כ-5 דקות מראש',
    _id: '123abc1e810c19729de864ac',
    target: '999999999',
    type: 'EVENT',
    sendTime: `${new Date().toISOString().slice(0, 10)}T13:00:01.996+00:00`,
    eventId: '123abc1e810c19729de872ec',
    status: 'FAILED',
    twilioSid: 'SM84a75a2f54362d0f2df074708e91d2be',
  },
  {
    message:
      'מלש"ב יקר, יש לך ראיון מחר! אנא התייצב לראיון הנדרש כ-5 דקות מראש',
    _id: '123abc1e810c19729de864ad',
    target: '555555555',
    type: 'EVENT',
    sendTime: `${new Date().toISOString().slice(0, 10)}T12:00:01.996+00:00`,
    eventId: '123abc1e810c19729de872ef',
    status: 'SENT',
    twilioSid: 'SM30772c6ca220430c06f7fb8082122795',
  },
  {
    message:
      'מלש"ב יקר, יש לך ראיון מחר! אנא התייצב לראיון הנדרש כ-5 דקות מראש',
    _id: '123abc1e810c19729de864ae',
    target: '999999999',
    type: 'EVENT',
    sendTime: `${new Date().toISOString().slice(0, 10)}T12:00:01.996+00:00`,
    eventId: '123abc1e810c19729de872ee',
    status: 'QUEUED',
    twilioSid: 'SM8738903bd1771748d242b7b6a61b0cdb',
  },
];
