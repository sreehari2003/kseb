import * as Yup from 'yup';
import { InferType } from 'yup';

const PickAnOptionValidator = Yup.object({
  value: Yup.string().required(),
  label: Yup.string().required(),
}).nullable();

export const profileValidator = Yup.object({
  name: Yup.string().required(),
  location: Yup.string().required(),
  role: PickAnOptionValidator.required('Select an option'),
});

export type ProfileType = InferType<typeof profileValidator>;
