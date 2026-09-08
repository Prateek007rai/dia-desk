import {Document} from "mongoose"
import { CompanyPlan, CompanySize } from "../enums"

export interface ICompany extends Document {
  name: string
  email: string
  phone?: string
  logo?: string
  website?: string
  industry?: string
  size?: CompanySize
  plan?: CompanyPlan
  isActive ?: boolean
  createdAt ?: Date
  updatedAt ?: Date

}
