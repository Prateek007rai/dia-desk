import mongoose, { Document } from "mongoose";
import { SalaryType } from "../enums";

export interface ISalary extends Document {
  companyId: mongoose.Types.ObjectId;
  employeeId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  salaryType: SalaryType;
  effectiveDate: Date;
}
