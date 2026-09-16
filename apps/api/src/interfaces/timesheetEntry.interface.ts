import mongoose, { Document } from "mongoose";
import { TimesheetStatus } from "../enums";

export interface ITimesheetEntry extends Document {
  companyId: mongoose.Types.ObjectId;
  employeeId: mongoose.Types.ObjectId;
  date: Date;
  weekStart: Date;
  project: string;
  task: string;
  hours: number;
  notes?: string;
  status: TimesheetStatus;
}
