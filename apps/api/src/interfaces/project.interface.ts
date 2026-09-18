import mongoose, { Document } from "mongoose";
import { ProjectStatus } from "../enums";

export interface IProject extends Document {
  companyId: mongoose.Types.ObjectId;
  managerId?: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  status: ProjectStatus;
  startDate?: Date;
  endDate?: Date;
}
