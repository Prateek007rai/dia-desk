import mongoose, { Document } from "mongoose";

export interface ILeaveBalance extends Document {
  companyId: mongoose.Types.ObjectId;
  employeeId: mongoose.Types.ObjectId;
  year: number;
  paidTotal: number;
  paidUsed: number;
  sickTotal: number;
  sickUsed: number;
  casualTotal: number;
  casualUsed: number;
}
