import Joi from "joi";

export const createLevelSchema = Joi.object({
  name: Joi.string().min(3).max(200).required(),
  description: Joi.string().optional(),
});
