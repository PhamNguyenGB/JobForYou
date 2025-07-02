import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().required(),
  role: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  email: Joi.string().email().optional(),
  passOld: Joi.string().min(6).optional(),
  passNew: Joi.string().min(6).optional(),
  phone: Joi.string().optional(),
  role: Joi.string().optional(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
