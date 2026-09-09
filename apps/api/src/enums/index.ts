export enum UserRole {
  COMPANY_ADMIN = "COMPANY_ADMIN",
  HR_MANAGER    = "HR_MANAGER",
  MANAGER       = "MANAGER",
  EMPLOYEE      = "EMPLOYEE",
}

export enum Gender {
  MALE   = "MALE",
  FEMALE = "FEMALE",
  OTHER  = "OTHER",
}

export enum EmploymentType {
  FULL_TIME  = "FULL_TIME",
  PART_TIME  = "PART_TIME",
  CONTRACT   = "CONTRACT",
  INTERN     = "INTERN",
}

export enum EmploymentStatus {
  ACTIVE     = "ACTIVE",
  INACTIVE   = "INACTIVE",
  TERMINATED = "TERMINATED",
}

export enum CompanyPlan {
  FREE       = "FREE",
  PRO        = "PRO",
  ENTERPRISE = "ENTERPRISE",
}

export enum CompanySize {
  SMALL  = "SMALL",  // 1 - 50
  MEDIUM = "MEDIUM", // 51 - 200
  LARGE  = "LARGE",  // 200+
}

export enum DepartmentStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}