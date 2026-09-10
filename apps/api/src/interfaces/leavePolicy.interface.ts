import mongoose, { Document } from "mongoose";

export interface ILeavePolicy extends Document {
  companyId: mongoose.Types.ObjectId;
  paidDays: number;
  sickDays: number;
  casualDays: number;
  maternityDays: number;
  unpaidDays: number;
}
