import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "COMPANY_ADMIN" | "HR_MANAGER" | "MANAGER" | "EMPLOYEE";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  departmentId?: mongoose.Types.ObjectId;
  managerId?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  designation: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  refreshToken?: string;
  joinDate: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    managerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["COMPANY_ADMIN", "HR_MANAGER", "MANAGER", "EMPLOYEE"],
      default: "EMPLOYEE",
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    joinDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// email must be unique within a company (not globally)
UserSchema.index({ companyId: 1, email: 1 }, { unique: true });

// hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// compare plain password with hashed one
UserSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
