import { Decimal } from "@prisma/client/runtime/library";

export type clusterdata = {
  cluster_id: number;
  cluster_name: string;
  status: string;
  ins_date_time: Date;

  update_date_time?: Date | null; // Nullable field
};

export type talukasdata = {
  id: bigint;
  name: String;
  name_marathi: String;
  status: String;
};

export type grampanchayat = {
  id: number;
  name: String;
  name_marathi: String;
  taluka_id: number;
  population: number;
  status: String;
};

export type Villages = {
  id: number;
  taluka_id: number;
  gp_id: number;
  name: string;
  name_marathi: string;
  total_population: number;
  trible_population: number;
  arthik_maryada: any; // Change this to Decimal
  village_type: string;
  status?: string;
  // created_at: Date;
  // updated_at?: Date | null;
};

export type Schooldata = {
  school_id: number;
  school_name: string;
  address: string;
  cluster_id: number; // Foreign key reference
  taluka_id: number; // Foreign key reference
  udias: string;
  stds: string;
  medium: string;
  email_id: string;
  mukhya_name: string;
  mukhya_contact: string;
  mukhya_email: string;
  purush_name: string;
  purush_contact: string;
  purush_email: string;
  stri_name: string;
  stri_contact: string;
  stri_email: string;
  status?: string; // Optional field
  ins_date_time: Date;
  school_name_mr: string;
  image_urls: string;
  pat_sankhya?: number | null;
  // cluster?: ClusterData; // Optional relationship
  // taluka?: TalukasData; // Optional relationship
};

export type Facility = {
  id: bigint; // Corresponds to BigInt in Prisma
  name: string; // Corresponds to String in Prisma
  status: string; // Corresponds to String in Prisma
  createdAt?: Date | null; // Nullable DateTime in Prisma
  updatedAt?: Date | null; // Nullable DateTime in Prisma
  // Corresponds to Int in Prisma
};
export type Representative = {
  id: bigint;
  name: string;
  status: string; // Change this to string if other values are allowed
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type Supervisor = {
  sup_id: number;
  sup_name: string;
  sup_contact: string;
  sup_address: string;
  sup_password?: string;
  imei_number?: string;
  category_id: number;
  padnam_id: number;
  sup_status: string; // Only these two values are allowed
};
export type Padnam = {
  padnam_id: number; // Represents int(11)
  padnam: string; // Represents varchar(50)
  status: string; // Represents varchar(10) with default value 'Active'
};

export type UserCategory = {
  user_cat_id: number; // Represents int(11)
  category_name: string; // Represents varchar(20)
  status: string; // Represents varchar(10) with default value 'Active'
};

export type Bank = {
  id: number; // Represents int(11)
  name: string; // Represents varchar(100)
  account_no: string; // Represents varchar(100)
  yojana_year_id: number; // Represents int(11)
  amount: any; // Represents decimal(20,2)
  status: string; // Represents varchar(10) with default value 'Active'
  ins_date_time: Date; // Represents datetime
  update_date_time?: Date | null; // Represents datetime
};
export type YojanaYear = {
  yojana_year_id: any; // Represents int(11)
  yojana_year: any; // Represents varchar(20)
  is_delete: any; // Represents varchar(20) with default value 'No'
  year_status: any; // Represents varchar(10)
};
export type OpeningBalance = {
  open_bal_id: number; // Represents int(11)
  open_bal: any; // Change from number to Decimal
  year_id: number; // Represents int(11)
  status: string; // Represents varchar(10) with default value 'Active'
  ins_date_time: Date; // Represents datetime
  update_date_time: Date | null; // Allow null values
};
export type NidhiVitaran = {
  id: bigint;
  work_master_id: bigint;
  date?: Date | null; // Optional date
  installment: string;
  amount: number; // Corresponds to Float in Prisma
  photo: string;
  latitude: string;
  longitude: string;
  address: string;
  status: string; // Default is 'Active'
  created_at?: Date | null; // Optional timestamp
  updatedAt?: Date | null; // Optional timestamp
};

export type WorkMaster = {
  id: bigint;
  taluka_id: bigint;
  gp_id: bigint;
  village_id: bigint;
  facility_id: bigint;
  representative_id: bigint;
  representative_name: string;
  name: string;
  estimated_amount: number; // Using number for Float in TypeScript
  tantrik_manyata_amount: number; // Using number for Float in TypeScript
  photo: string;
  prashashakiya_manyata: string; // Limited to 5 characters
  prashashakiya_manyata_no: string;
  prashashakiya_manyata_date?: Date | null; // Optional date field
  prashashakiya_manyata_amount: number; // Using number for Float in TypeScript
  latitude: string;
  longitude: string;
  address: string;
  status: string; // Default is 'Active'
  created_at?: Date | null; // Optional date field
  updated_at?: Date | null; // Optional date field
};

export type Notificationdata = {
  notifi_id: number;
  notifications_type: string;
  details: string;
  links: string;
  new_icon: string;
  add_date: Date;
  header: string;
  img: string;
  status: string;
};

export interface StudentData {
  student_id: number; // Primary Key
  serial_number?: string | null; // Optional field
  uid?: string | null; // Optional field
  gr_no?: string | null; // Optional field
  date_of_admision?: Date | null; // Optional field
  year_add?: string | null; // Optional field
  school_id: number; // Optional field
  admited_in_std?: number | null; // Optional field
  current_std: number; // Optional field
  division?: string | null; // Optional field
  first_name?: string | null; // Optional field
  middle_name?: string | null; // Optional field
  last_name?: string | null; // Optional field
  date_of_birth?: Date | null; // Optional field
  place_of_birth?: string | null; // Optional field
  gender?: string | null; // Optional field
  height?: Decimal | null; // Optional field (Decimal)
  weight?: Decimal | null; // Optional field (Decimal)
  mother_name?: string | null; // Optional field
  religion?: string | null; // Optional field
  lang_id?: number | null; // Optional field
  cast?: string | null; // Optional field
  address?: string | null; // Optional field
  contact_no?: string | null; // Optional field
  full_name?: string | null; // Optional field
  user_id?: number | null; // Optional field
  cluster_id?: number | null; // Optional field
  dropout?: string | null; // Optional field (default "No")
  dropout_date_time?: Date | null; // Optional field
  status: string; // Required field (default "Active")
  ins_date_time?: Date | null; // Optional field
  update_date_time?: Date | null; // Automatically updated timestamp
  students_id_saral?: string | null; // Optional field
  type_of_students?: string | null; // Optional field
  saral_id?: string | null; // Optional field
  date_leave?: Date | null; // Optional field
  remarks?: string | null; // Optional field
  stream?: string | null; // Optional field
  profile_photo?: string | null; // Optional field
  photo_update_date_time?: Date | null; // Optional field
  sickle_cell?: string | null; // Optional field
  aadhaar?: string | null; // Optional field
  sickle_report?: string | null; // Optional field
}

export type Standarddata = {
  standard_id: number; // Corresponds to standard_id
  section_id: number; // Corresponds to section_id
  standard_name: string; // Corresponds to standard_name
  status: string; // Corresponds to status
  ins_date_time: Date; // Corresponds to ins_date_time
  update_date_time: Date;
};

export type Patsankhya = {
  pat_id: number; // Corresponds to pat_id
  school_id: number; // Corresponds to school_id
  standard_id: number; // Corresponds to standard_id
  sankhya: number; // Corresponds to sankhya
};

export type SubCategory = {
  sub_category_id: number;
  category_id: number;
  sub_category_name: string;
  yojana_year_id: number;
  bank_id: number;
  amount: Decimal; // Use 'number' for decimal values in TypeScript
  status: string;
  created_at: Date; // Use 'Date' for datetime values in TypeScript
  updated_at?: Date | null; // Optional field
  for_app: string;
};

export type YojanaMaster = {
  yojana_id: number;
  category_id: number;
  sub_category_id: number;
  yojana_name: string;
  date_ins: Date; // Assuming you will handle this as a Date object
  uddesh_swarup: string;
  patrata: string;
  sampark: string;
  is_delete: string; // 'Yes' or 'No'
  status: string; // 'Active' or other statuses
  gat: string;
  yojana_year_id: number;
  yojana_type: string;
  amount: Decimal; // This will be a decimal value
};

export type Categorys = {
  category_id: number; // Primary key as a number
  category_name: string; // Name of the category
  status: string; // Status of the category, e.g., 'Active'
  created_at: Date; // Timestamp for when the category was created
  updated_at?: Date | null; // Timestamp for when the category was last updated
  for_app: string; // Indicates if the category is for app use, e.g., 'Yes' or 'No'
};

export type TblYojanaType = {
  yojana_type_id: number; // Corresponds to Int
  category_id: number; // Corresponds to Int
  sub_category_id: number; // Corresponds to Int
  yojana_type: string; // Corresponds to String
  status: string; // Corresponds to String
  ins_date_time: Date; // Corresponds to DateTime
  update_date_time?: Date | null; // Corresponds to DateTime
};

export type YojanaMasterApp = {
  yojana_id: number; // Unique identifier for the scheme
  category_id: number; // ID for the category
  sub_category_id: number; // ID for the sub-category
  yojana_name: string; // Name of the scheme
  date_ins: Date; // Date of insertion
  uddesh_swarup: string; // Purpose of the scheme
  patrata: string; // Eligibility criteria
  sampark: string; // Contact information
  is_delete: string; // Deletion status (e.g., 'No' or 'Yes')
  status: string; // Current status (e.g., 'Active' or 'Inactive')
  gat: string; // Group information
  yojana_year_id: number; // ID for the year of the scheme
  yojna_img: string; // Image URL or path for the scheme
};

export type TblBeneficiary = {
  beneficiary_id: number;
  category_id: number;
  sub_category_id: number;
  yojana_year_id: number;
  yojana_type: string;
  yojana_id: number;
  taluka_id: number;
  gp_id: number;
  village_id: number;
  surname: string;
  firstname: string;
  middlename: string;
  fullname: string;
  gat_name: string;
  gat_certificate: string;
  member: number;
  caste_id: number;
  beneficiary_type: string;
  rashion_no: string;
  aadhar: string;
  mobile: string;
  bank_name: string;
  ifsc: string;
  ac_no: string;
  tot_finance: Decimal; // Decimal in Prisma corresponds to number in TypeScript
  amount_paid: string;
  fourty: string; // 'Yes' or 'No'
  sixty: string; // 'Yes' or 'No'
  hundred: string; // 'Yes' or 'No'
  status: string; // Default is 'Active'
  date_ins: Date; // DateTime in Prisma corresponds to Date in TypeScript
  date_update?: Date | null; // DateTime in Prisma corresponds to Date in TypeScript
  organization: string;
  work_order_date?: Date | null; // Date type for work order date
};