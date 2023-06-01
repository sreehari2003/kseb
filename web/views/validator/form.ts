import * as Yup from 'yup';
import { OptionalObjectSchema } from 'yup/lib/object';

const PickAnOptionValidator = Yup.object({
  value: Yup.string().required(),
  label: Yup.string().required(),
}).nullable();

export const formOne = Yup.object({
  section: Yup.string().required(),
  typeofjob: PickAnOptionValidator.required(),
  complaintNumber: Yup.number().required(),
  voltage: PickAnOptionValidator.required(),
  location: Yup.string().required(),
  disconnectionPlace: Yup.string().required(),
});

export const formTwo = Yup.object({
  description: Yup.string().required(),
  ptwAllowed: Yup.string().required(),
  officerName: Yup.string().required(),
  officerRecieving: Yup.string().required(),
  shortedLocation: Yup.string().required(),
  earthedLocations: Yup.string().required(),
  powerOutage: Yup.string().required(),
});

export const formThree = Yup.object({
  feeder: Yup.string().required(),
  substatiom: Yup.string().required(),
  tranformer: Yup.string().required(),
  postno: Yup.string().required(),
  consumernumber: Yup.string(),
  jobdescription: Yup.string().required(),
  nooflabours: Yup.string().required(),
  officerDesignation: Yup.string().required(),
  employeeName: Yup.string().required(),
  timeOfWork: Yup.date().required(),
  usedItems: Yup.string(),
});

export const FinalForm = Yup.object({
  section: Yup.string().required(),
  typeofjob: Yup.string().required(),
  complaintNumber: Yup.string(),
  voltage: Yup.number().required(),
  location: Yup.string().required(),
  disconnectionPlace: Yup.string().required(),
  description: Yup.string().required(),
  ptwAllowed: Yup.string().required(),
  officerName: Yup.string().required(),
  officerRecieving: Yup.string().required(),
  shortedLocation: Yup.string().required(),
  earthedLocations: Yup.string().required(),
  powerOutage: Yup.string().required(),
  feeder: Yup.string().required(),
  substatiom: Yup.string().required(),
  tranformer: Yup.string().required(),
  postno: Yup.string().required(),
  consumernumber: Yup.string(),
  jobdescription: Yup.string().required(),
  nooflabours: Yup.string().required(),
});

export const StepByStepForm: Record<number, OptionalObjectSchema<any>> = {
  1: formOne,
  2: formTwo,
  3: formThree,
};
