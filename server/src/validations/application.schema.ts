import Joi from "joi";

export const createApplicationSchema = Joi.object({
  job_post_id: Joi.number().required(),
  file_cv: Joi.string().required(),
  note: Joi.string().min(5).required(),
});
