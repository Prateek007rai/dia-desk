import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import {
  UserRole,
  Gender,
  EmploymentType,
  EmploymentStatus,
} from "../enums";

// ─── Interface ────────────────────────────────────────────────────────────────

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;

  // tenant reference
  companyId: mongoose.Types.ObjectId;

  // org references
  departmentId?: mongoose.Types.ObjectId;
  managerId?:    mongoose.Types.ObjectId;

  // personal info
  name:     string;
  email:    string;
  password: string;
  phone?:   string;
  avatar?:  string;
  dob?:     Date;
  gender?:  Gender;

  // employment info
  role:             UserRole;
  designation:      string;
  employmentType:   EmploymentType;
  employmentStatus: EmploymentStatus;
  joinDate:         Date;

  // auth
  isActive:      boolean;
  refreshToken?: string;

  // timestamps
  createdAt: Date;
  updatedAt: Date;

  // methods
  comparePassword(candidate: string): Promise<boolean>;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const UserSchema = new Schema<IUser>(
  {
    companyId: {
      type:     Schema.Types.ObjectId,
      ref:      "Company",
      required: true,
      index:    true,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref:  "Department",
    },
    managerId: {
      type: Schema.Types.ObjectId,
      ref:  "User",
    },
    name: {
      type:     String,
      required: true,
      trim:     true,
    },
    email: {
      type:      String,
      required:  true,
      lowercase: true,
      trim:      true,
    },
    password: {
      type:     String,
      required: true,
      select:   false,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    role: {
      type:    String,
      enum:    Object.values(UserRole),
      default: UserRole.EMPLOYEE,
    },
    designation: {
      type:     String,
      required: true,
      trim:     true,
    },
    employmentType: {
      type:    String,
      enum:    Object.values(EmploymentType),
      default: EmploymentType.FULL_TIME,
    },
    employmentStatus: {
      type:    String,
      enum:    Object.values(EmploymentStatus),
      default: EmploymentStatus.ACTIVE,
    },
    joinDate: {
      type:     Date,
      required: true,
    },
    isActive: {
      type:    Boolean,
      default: true,
    },
    refreshToken: {
      type:   String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────

UserSchema.index({ companyId: 1, email: 1 }, { unique: true });

// ─── Hooks ────────────────────────────────────────────────────────────────────

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ─── Methods ──────────────────────────────────────────────────────────────────

UserSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

// ─── Model ────────────────────────────────────────────────────────────────────

export const User = mongoose.model<IUser>("User", UserSchema);
