import mongoose, { Schema } from "mongoose";
import { IDepartment } from "../interfaces/department.interface";
import { DepartmentStatus } from "../enums";

const DepartmentSchema = new Schema<IDepartment>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
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
    status: {
      type: String,
      enum: Object.values(DepartmentStatus),
      default: DepartmentStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure department names are unique per company
DepartmentSchema.index({ companyId: 1, name: 1 }, { unique: true });

export const Department = mongoose.model<IDepartment>("Department", DepartmentSchema);
