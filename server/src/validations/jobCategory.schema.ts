import Joi from "joi";

export const createJobCategorySchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
});
