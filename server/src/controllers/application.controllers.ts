import applicationServices from "../services/application.services";
import { Request, Response } from "express";

export class ApplicationController {
  createApplication = async (req: Request, res: Response) => {
    try {
      const payload = {
        ...req.body,
        file_cv: req.file
          ? `http://localhost:3000/files_cv/${req.file.filename}`
          : null,
        user_id: Number(res.locals.user.id),
      };
      let data = await applicationServices.createApplication(payload);
      if (data) {
        res.status(201).json({ message: "create application success" });
        return;
      }
      res.status(400).json({ message: "create application fail" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "create application fail" });
    }
  };

  getMyApplication = async (req: Request, res: Response) => {
    try {
      const userId = Number(res.locals.user.id);
      const page = req.params.page ? Number(req.params.page) : 1;
      const limit = req.params.limit ? Number(req.params.limit) : 10;
      let data = await applicationServices.getApplicationByUserId(
        userId,
        page,
        limit
      );
      if (data) {
        res
          .status(200)
          .json({ message: "get my application success", data: data });
        return;
      }
      res.status(400).json({ message: "get my application fail" });
      return;
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "get my application fail" });
      return;
    }
  };

  getApplicationForEmployer = async (req: Request, res: Response) => {
    try {
      const page = req.body.page ? Number(req.body.page) : 1;
      const limit = req.body.limit ? Number(req.body.limit) : 10;
      const jobPostId = Number(req.body.id);
      let data = await applicationServices.getApplicationByJobPostId(
        jobPostId,
        page,
        limit
      );
      if (data) {
        res.status(200).json({
          message: "get application for employer success",
          data: data,
        });
        return;
      }
      res.status(400).json({ message: "get application for employer fail" });
      return;
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "get application for employer fail" });
      return;
    }
  };
}

const applicationController = new ApplicationController();
export default applicationController;
