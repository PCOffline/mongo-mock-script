import mongoose from 'mongoose';
import { collectionNames, Role } from './utils.js';

const { Schema } = mongoose;

export const model = collectionNames.user;
export const schema = new Schema(
  {
    mail: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: Role,
      required: true,
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

schema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Data
export default [
  {
    _id: '507f1f77bcf86cd799439033',
    name: 'מראיינ/ת 1',
    role: 'INTERVIEWER',
    unitId: '507f191e810c19729de861ea',
    mail: 'INTERVIEWER1ea1@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'מראיינ/ת 2',
    role: 'INTERVIEWER',
    unitId: '507f191e810c19729de861ea',
    mail: 'INTERVIEWER1ea2@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439013',
    name: 'מראיינ/ת 3',
    role: 'INTERVIEWER',
    unitId: '507f191e810c19729de861ea',
    mail: 'INTERVIEWER1ea3@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439021',
    name: 'מראיינ/ת 4',
    role: 'INTERVIEWER',
    unitId: '507f191e810c19729de861ea',
    mail: 'INTERVIEWER1ea4@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439022',
    name: 'מראיינ/ת 5',
    role: 'INTERVIEWER',
    unitId: '507f191e810c19729de861ea',
    mail: 'INTERVIEWER1ea5@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439023',
    name: 'מראיינ/ת 6',
    role: 'INTERVIEWER',
    unitId: '507f191e810c19729de861ea',
    mail: 'INTERVIEWER1ea6@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439020',
    name: 'מראיינ/ת 7',
    role: 'INTERVIEWER',
    unitId: '507f191e810c19729de861ea',
    mail: 'INTERVIEWER1ea7@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439032',
    name: 'מראיינ/ת 8',
    role: 'INTERVIEWER',
    unitId: '507f191e810c19729de861ea',
    mail: 'INTERVIEWER1ea8@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439034',
    name: 'מראיינ/ת 9',
    role: 'INTERVIEWER',
    unitId: '507f191e810c19729de861ea',
    mail: 'INTERVIEWER1ea9@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439014',
    name: 'רמ"ד איתור 1',
    role: 'RAMAD_ITUR_OF_UNIT',
    unitId: '507f191e810c19729de861ea',
    mail: 'RAMAD_ITUR_OF_UNIT1ea1@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439015',
    name: 'רמ"ד איתור 2',
    role: 'RAMAD_ITUR_OF_UNIT',
    unitId: '507f191e810c19729de861ea',
    mail: 'RAMAD_ITUR_OF_UNIT1ea2@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439016',
    name: 'עוזר/ת רמ"ד איתור 1',
    role: 'RAMAD_ITUR_ASSISTANT',
    unitId: '507f191e810c19729de861ea',
    mail: 'RAMAD_ITUR_ASSISTANT1ea1@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439017',
    name: 'רמ"ד מקצועי 1',
    role: 'PROFESSIONAL_RAMAD',
    unitId: '507f191e810c19729de861ea',
    mail: 'PROFESSIONAL_RAMAD1ea1@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439018',
    name: 'רמ"ד מקצועי 2',
    role: 'PROFESSIONAL_RAMAD',
    unitId: '507f191e810c19729de861ea',
    mail: 'PROFESSIONAL_RAMAD1ea2@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439019',
    name: 'רמ"ד מקצועי 3',
    role: 'PROFESSIONAL_RAMAD',
    unitId: '507f191e810c19729de861ea',
    mail: 'PROFESSIONAL_RAMAD1ea3@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439010',
    name: 'רמ"ד מקצועי 4',
    role: 'PROFESSIONAL_RAMAD',
    unitId: '507f191e810c19729de861ea',
    mail: 'PROFESSIONAL_RAMAD1ea4@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439024',
    name: 'פסיכולוג/ית 1',
    role: 'PSYCHOLOGIST',
    unitId: '507f191e810c19729de863ea',
    mail: 'PSYCHOLOGIST1ea1@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439025',
    name: 'פסיכולוג/ית 2',
    role: 'PSYCHOLOGIST',
    unitId: '507f191e810c19729de863ea',
    mail: 'PSYCHOLOGIST1ea2@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439026',
    name: 'פסיכולוג/ית 3',
    role: 'PSYCHOLOGIST',
    unitId: '507f191e810c19729de863ea',
    mail: 'PSYCHOLOGIST1ea3@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439027',
    name: 'פסיכולוג/ית 4',
    role: 'PSYCHOLOGIST',
    unitId: '507f191e810c19729de863ea',
    mail: 'PSYCHOLOGIST1ea4@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439028',
    name: 'פסיכולוג/ית 5',
    role: 'PSYCHOLOGIST',
    unitId: '507f191e810c19729de863ea',
    mail: 'PSYCHOLOGIST1ea5@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799411111',
    name: 'פסיכולוג/ית מראיינ/ת  1',
    role: 'INTERVIEWER_PSYCHOLOGIST',
    unitId: '507f191e810c19729de863ea',
    mail: 'INTERVIEWER_PSYCHOLOGIST1ea1@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439029',
    name: 'מאבחנ/ת 1',
    role: 'DIAGNOSER',
    unitId: '507f191e810c19729de863ea',
    mail: 'DIAGNOSER1ea1@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439030',
    name: 'מאבחנ/ת 2',
    role: 'DIAGNOSER',
    mail: 'DIAGNOSER1ea2@iturradardev.onmicrosoft.com',
    unitId: '507f191e810c19729de863ea',
  },
  {
    _id: '507f1f77bcf86cd799439031',
    name: 'מד"ה 1',
    mail: 'MADA1ea1@iturradardev.onmicrosoft.com',
    unitId: '507f191e810c19729de863ea',
    role: 'MADA',
  },
  {
    _id: '507f1f77bcf86cd799439072',
    name: 'טכני 1',
    role: 'TECHNICAL',
    mail: 'TECH1ea1@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439073',
    name: 'טכני 2',
    role: 'TECHNICAL',
    mail: 'TECH1ea2@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439075',
    name: 'טכני 3',
    role: 'TECHNICAL',
    mail: 'TECH1ea3@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439083',
    name: 'איתור 1',
    role: 'ITUR',
    mail: 'ITUR1ea1@iturradardev.onmicrosoft.com',
  },
  {
    _id: '507f1f77bcf86cd799439085',
    name: 'אלפא',
    role: 'ALPHA',
    mail: 'Alpha@iturradardev.onmicrosoft.com',
  },
];
