import mongoose, { Schema } from "mongoose";
import { ILeaveRequest } from "../interfaces/leaveRequest.interface";
import { LeaveType, LeaveStatus, LeaveApprovalStatus } from "../enums";

const LeaveRequestSchema = new Schema<ILeaveRequest>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: Object.values(LeaveType),
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
      min: 0.5,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(LeaveStatus),
      default: LeaveStatus.PENDING,
    },
    managerApproval: {
      type: String,
      enum: Object.values(LeaveApprovalStatus),
      default: LeaveApprovalStatus.PENDING,
    },
    hrApproval: {
      type: String,
      enum: Object.values(LeaveApprovalStatus),
      default: LeaveApprovalStatus.PENDING,
    },
    managerNote: {
      type: String,
      trim: true,
    },
    hrNote: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const LeaveRequest = mongoose.model<ILeaveRequest>("LeaveRequest", LeaveRequestSchema);
