import mongoose, { Schema } from "mongoose";
import { ILeavePolicy } from "../interfaces/leavePolicy.interface";

const LeavePolicySchema = new Schema<ILeavePolicy>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      unique: true, // Only one leave policy per company
    },
    paidDays: {
      type: Number,
      default: 18,
    },
    sickDays: {
      type: Number,
      default: 12,
    },
    casualDays: {
      type: Number,
      default: 6,
    },
    maternityDays: {
      type: Number,
      default: 180,
    },
    unpaidDays: {
      type: Number,
      default: 999, // unlimited
    },
  },
  {
    timestamps: true,
  }
);

export const LeavePolicy = mongoose.model<ILeavePolicy>("LeavePolicy", LeavePolicySchema);
