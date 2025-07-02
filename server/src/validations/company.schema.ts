import Joi from "joi";

export const createTokenSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  address: Joi.string().min(3).required(),
  avatar: Joi.string().min(3).required(),
  link_website: Joi.string().min(3).required(),
  members: Joi.string().min(3).max(100).required(),
});
