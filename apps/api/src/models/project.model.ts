import mongoose, { Schema } from "mongoose";
import { IProject } from "../interfaces/project.interface";
import { ProjectStatus } from "../enums";

const ProjectSchema = new Schema<IProject>(
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
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.ACTIVE,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure project names are unique per company
ProjectSchema.index({ companyId: 1, name: 1 }, { unique: true });

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
