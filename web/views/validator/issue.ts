import * as Yup from 'yup';

export const issueValidator = Yup.object({
  title: Yup.string().required(),
  desc: Yup.string().required(),
  post_id: Yup.string().required(),
});
