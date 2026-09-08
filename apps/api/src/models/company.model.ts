import mongoose, { Schema } from "mongoose"
import { ICompany } from "../interfaces/company.interface"
import { CompanyPlan, CompanySize } from "../enums"

const CompanySchema = new Schema<ICompany>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  logo: { type: String },
  website: { type: String, trim: true },
  industry: { type: String, trim: true },
  size: { type: String, enum: Object.values(CompanySize), default: CompanySize.SMALL },
  plan: { type: String, enum: Object.values(CompanyPlan), default: CompanyPlan.FREE },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
})

export const Company = mongoose.model<ICompany>("Company", CompanySchema)