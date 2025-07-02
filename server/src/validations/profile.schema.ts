import Joi from "joi";

export const createProfileSchema = Joi.object({
  gender: Joi.string().required(),
  phone: Joi.string().required(),
});
