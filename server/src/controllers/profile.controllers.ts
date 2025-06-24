import * as profileServices from "../services/profile.services";
import { Request, Response } from "express";

export const createProfile = async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    user_id: Number(res.locals.user.id),
    cv_file: req.file
      ? `http://localhost:3000/files_cv/${req.file.filename}`
      : null,
  };
  const profile = await profileServices.createProfile(payload);
  res.status(200).json(profile);
  return;
};

export const getProfile = async (req: Request, res: Response) => {
  const profileId = Number(req.params.id);
  const profile = await profileServices.getProfile(profileId);
  res.status(200).json(profile);
  return;
};

export const updateProfile = async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    user_id: Number(res.locals.user.id),
    cv_file: req.file
      ? `http://localhost:3000/files_cv/${req.file.filename}`
      : null,
  };
  const profile = await profileServices.updateProfile(payload);
  res.status(200).json(profile);
  return;
};
