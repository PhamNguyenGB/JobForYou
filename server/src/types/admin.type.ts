export interface CreateAdminPayload {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateAdminPayload {
  name?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AdminAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// const express = require('express');
// const Joi = require('joi');

// const app = express();
// app.use(express.json());

// const userSchema = Joi.object({
//   name: Joi.string().min(3).required(),
//   email: Joi.string().email().required(),
//   age: Joi.number().integer().min(18)
// });

// app.post('/user', (req, res) => {
//   const { error } = userSchema.validate(req.body);
//   if (error) return res.status(400).json({ error: error.details[0].message });

//   res.json({ message: 'Payload is valid!' });
// });

// app.listen(3000);

// // src/index.ts
// import express, { Request, Response } from 'express';
// import Joi from 'joi';

// const app = express();
// app.use(express.json());

// // Define Joi schema
// const userSchema = Joi.object({
//   name: Joi.string().min(3).required(),
//   email: Joi.string().email().required(),
//   age: Joi.number().integer().min(18).optional(),
// });

// // TypeScript interface for inferred type (optional)
// interface User {
//   name: string;
//   email: string;
//   age?: number;
// }

// // Route with validation
// app.post('/user', (req: Request, res: Response) => {
//   const { error, value } = userSchema.validate(req.body, { abortEarly: false });

//   if (error) {
//     return res.status(400).json({ errors: error.details.map(err => err.message) });
//   }

//   const user: User = value;
//   res.status(200).json({ message: 'Payload is valid', user });
// });

// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });

// hoắc là tạo middleware giống vậy export const validate =
//   (schema: Schema, property: 'body' | 'query' | 'params' = 'body') =>
//   (req: Request, res: Response, next: NextFunction) => {
//     const { error, value } = schema.validate(req[property], {
//       abortEarly: false,
//       allowUnknown: false,
//       stripUnknown: true,
//     });

//     if (error) {
//       return res.status(400).json({ errors: error.details.map((d) => d.message) });
//     }

//     req[property] = value;
//     next();
//   };

// app.post(
//   '/user',
//   validate(userSchema, 'body'),
//   (req: Request, res: Response) => {
//     res.json({ message: 'Payload is valid!' });
//   }
// );
