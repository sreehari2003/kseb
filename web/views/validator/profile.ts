import * as Yup from 'yup';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const profileValidator = Yup.object({
  name: Yup.string().required(),
  id: Yup.string().required(),
  phoneNumber: Yup.string()
    .required()
    .min(10)
    .max(10)
    .matches(phoneRegExp, 'Phone number is not valid'),
  location: Yup.string().required(),
  designation: Yup.string().required(),
});
