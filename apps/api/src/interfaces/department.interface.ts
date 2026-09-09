import mongoose, { Document } from "mongoose";
import { DepartmentStatus } from "../enums";

export interface IDepartment extends Document {
  companyId: mongoose.Types.ObjectId;
  managerId?: mongoose.Types.ObjectId;
  name: string;
  status: DepartmentStatus;
}
