import * as Yup from 'yup';

export const form = Yup.object({
  section: Yup.string().required(),
  typeofjob: Yup.string().required(),
  voltage: Yup.number().required(),
  location: Yup.string().required(),
  feeder: Yup.string().required(),
  substatiom: Yup.string().required(),
  tranformer: Yup.string().required(),
  postno: Yup.string().required(),
  consumernumber: Yup.string(),
  jobdescription: Yup.string().required(),
  nooflabours: Yup.string().required(),
});
