import mongoose, { Document } from "mongoose";
import {
  UserRole,
  Gender,
  EmploymentType,
  EmploymentStatus,
} from "../enums";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;

  // tenant reference
  companyId: mongoose.Types.ObjectId;

  // org references
  departmentId?: mongoose.Types.ObjectId;
  managerId?: mongoose.Types.ObjectId;

  // personal info
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  dob?: Date;
  gender?: Gender;

  // employment info
  role: UserRole;
  designation: string;
  employmentType: EmploymentType;
  employmentStatus: EmploymentStatus;
  joinDate: Date;

  // auth
  isActive: boolean;
  refreshToken?: string;

  // timestamps
  createdAt: Date;
  updatedAt: Date;

  // methods
  comparePassword(candidate: string): Promise<boolean>;
}
