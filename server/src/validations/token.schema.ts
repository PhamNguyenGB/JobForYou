import Joi from "joi";

export const createTokenSchema = Joi.object({
  user_id: Joi.number().required(),
  admin_id: Joi.number().required(),
  refresh_token: Joi.string().required(),
  type: Joi.string().required(),
  expires_at: Joi.date().required(),
  is_revoked: Joi.boolean().required(),
});

export const refreshTokenSchema = Joi.object({
  refresh_token: Joi.string().required(),
});
