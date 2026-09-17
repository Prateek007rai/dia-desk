import mongoose, { Schema } from "mongoose";
import { ISalary } from "../interfaces/salary.interface";
import { SalaryType } from "../enums";

const SalarySchema = new Schema<ISalary>(
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
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
      trim: true,
    },
    salaryType: {
      type: String,
      enum: Object.values(SalaryType),
      default: SalaryType.MONTHLY,
    },
    effectiveDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: ensure an employee only has one active salary starting on a particular date
SalarySchema.index({ companyId: 1, employeeId: 1, effectiveDate: 1 }, { unique: true });

export const Salary = mongoose.model<ISalary>("Salary", SalarySchema);
