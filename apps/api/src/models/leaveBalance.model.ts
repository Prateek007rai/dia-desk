import mongoose, { Schema } from "mongoose";
import { ILeaveBalance } from "../interfaces/leaveBalance.interface";

const LeaveBalanceSchema = new Schema<ILeaveBalance>(
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
    },
    year: {
      type: Number,
      required: true,
    },
    paidTotal: { type: Number, default: 0 },
    paidUsed: { type: Number, default: 0 },
    sickTotal: { type: Number, default: 0 },
    sickUsed: { type: Number, default: 0 },
    casualTotal: { type: Number, default: 0 },
    casualUsed: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// One balance per employee per year
LeaveBalanceSchema.index({ companyId: 1, employeeId: 1, year: 1 }, { unique: true });

export const LeaveBalance = mongoose.model<ILeaveBalance>("LeaveBalance", LeaveBalanceSchema);
