import { Schema } from 'mongoose';
import { collectionNames, SmsTypes, SmsStatuses } from '../utils';

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
// TODO: Add data after sms-track goes into dev
export default [];
