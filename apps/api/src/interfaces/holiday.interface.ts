import mongoose, { Document } from "mongoose";
import { HolidayType } from "../enums";

export interface IHoliday extends Document {
  companyId: mongoose.Types.ObjectId;
  name: string;
  date: Date;
  type: HolidayType;
}
