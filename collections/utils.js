export const collectionNames = {
  event: 'Event',
  malshab: 'Malshab',
  node: 'Node',
  nodeGroup: 'NodeGroup',
  unit: 'Unit',
  user: 'User',
  questionnaireSchema: 'QuestionnaireSchema',
  questionnaireInstance: 'QuestionnaireInstance',
  temporaryInstance: 'TemporaryInstance',
  sms: 'Sms',
};

export const Role = {
  Interviewer: 'INTERVIEWER',
  RamadIturOfUnit: 'RAMAD_ITUR_OF_UNIT',
  RamadIturAssistant: 'RAMAD_ITUR_ASSISTANT',
  ProfessionalRamad: 'PROFESSIONAL_RAMAD',
  Mada: 'MADA',
  Itur: 'ITUR',
  Psychologist: 'PSYCHOLOGIST',
  InterviewerPsychologist: 'INTERVIEWER_PSYCHOLOGIST',
  Diagnoser: 'DIAGNOSER',
  Technical: 'TECHNICAL',
  Alpha: 'ALPHA',
};

export const TargetTypes = {
  Interviewer: Role.Interviewer,
  Psychologist: Role.Psychologist,
  Diagnoser: Role.Diagnoser,
  Mada: Role.Mada,
  InterviewerPsychologist: Role.InterviewerPsychologist,
  Malshab: 'MALSHAB',
};

export const ModifyTargetTypes = {
  RamadIturOfUnit: Role.RamadIturOfUnit,
  RamadIturAssistant: Role.RamadIturAssistant,
  ProfessionalRamad: Role.ProfessionalRamad,
  Psychologist: Role.Psychologist,
  Mada: Role.Mada,
};

export const SmsTypes = {
  event: 'EVENT',
  delay: 'DELAY',
};

export const SmsStatuses = {
  sent: 'sent',
  delivered: 'delivered',
  undelivered: 'undelivered',
  failed: 'failed',
  queued: 'queued',
};

export const NodeType = {
  Interview: 'INTERVIEW',
  Exam: 'EXAM',
  Physical: 'PHYSICAL',
  Unknown: 'UNKNOWN',
  Classified: 'CLASSIFIED',
};
