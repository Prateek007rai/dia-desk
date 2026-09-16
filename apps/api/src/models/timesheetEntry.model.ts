import mongoose, { Schema } from "mongoose";
import { ITimesheetEntry } from "../interfaces/timesheetEntry.interface";
import { TimesheetStatus } from "../enums";

const TimesheetEntrySchema = new Schema<ITimesheetEntry>(
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
    date: {
      type: Date,
      required: true,
    },
    weekStart: {
      type: Date,
      required: true,
      index: true,
    },
    project: {
      type: String,
      required: true,
      trim: true,
    },
    task: {
      type: String,
      required: true,
      trim: true,
    },
    hours: {
      type: Number,
      required: true,
      min: 0.5,
      max: 24,
    },
    notes: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(TimesheetStatus),
      default: TimesheetStatus.DRAFT,
    },
  },
  {
    timestamps: true,
  }
);

export const TimesheetEntry = mongoose.model<ITimesheetEntry>("TimesheetEntry", TimesheetEntrySchema);
