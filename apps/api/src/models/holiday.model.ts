import mongoose, { Schema } from "mongoose";
import { IHoliday } from "../interfaces/holiday.interface";
import { HolidayType } from "../enums";

const HolidaySchema = new Schema<IHoliday>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(HolidayType),
      default: HolidayType.MANDATORY,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a company doesn't have duplicate holidays on the same date
HolidaySchema.index({ companyId: 1, date: 1 }, { unique: true });

export const Holiday = mongoose.model<IHoliday>("Holiday", HolidaySchema);
