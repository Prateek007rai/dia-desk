import mongoose, { Document } from "mongoose";
import { LeaveType, LeaveStatus, LeaveApprovalStatus } from "../enums";

export interface ILeaveRequest extends Document {
  companyId: mongoose.Types.ObjectId;
  employeeId: mongoose.Types.ObjectId;
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  reason: string;
  status: LeaveStatus;
  managerApproval: LeaveApprovalStatus;
  hrApproval: LeaveApprovalStatus;
  managerNote?: string;
  hrNote?: string;
}
