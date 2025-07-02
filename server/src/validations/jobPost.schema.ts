import Joi from "joi";

export const createJobPostSchema = Joi.object({
  company_id: Joi.number().required(),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  salary: Joi.string().optional(),
  benefits: Joi.string().optional(),
  deadline: Joi.date().required(),
  skills: Joi.string().optional(),
  education: Joi.string().optional(),
  quantity: Joi.number().optional(),
  status: Joi.string().required(),
  category_id: Joi.number().required(),
});
