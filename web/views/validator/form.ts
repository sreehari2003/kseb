import * as Yup from 'yup';

export const formOne = Yup.object({
  section: Yup.string().required(),
  typeofjob: Yup.string().required(),
  voltage: Yup.number().required(),
  location: Yup.string().required(),
  complaintNumber: Yup.string(),
  disconnectionPlace: Yup.string().required(),
  feeder: Yup.string().required(),
  substatiom: Yup.string().required(),
  tranformer: Yup.string().required(),
  postno: Yup.string().required(),
  consumernumber: Yup.string(),
  jobdescription: Yup.string().required(),
  nooflabours: Yup.string().required(),
});

export const formTwo = Yup.object({
  description: Yup.string().required(),
  ptwAllowed: Yup.string().required(),
  officerName: Yup.string().required(),
  officerRecieving: Yup.string().required(),
  shortedLocation: Yup.string().required(),
  earthedLocations: Yup.string().required(),
});
