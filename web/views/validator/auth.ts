import * as Yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const phoneNumber = Yup.object({
  phoneNumber: Yup.string()
    .required()
    .min(10)
    .max(10)
    .matches(phoneRegExp, 'Phone number is not valid'),
});

export const OTP = Yup.object({
  otp: Yup.string().min(6).max(6).required('Please Enter a valid otp'),
});
