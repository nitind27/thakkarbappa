
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

}

export type grampanchayat = {
  id: number;
  name: String;
  name_marathi: String;
  taluka_id: number;
  population: number;
  status: String;
}

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

  // cluster?: ClusterData; // Optional relationship
  // taluka?: TalukasData; // Optional relationship
};

export type StudentData = {
  studentId: number;          // Corresponds to `student_id`
  schoolId: number;           // Corresponds to `school_id`
  standardId: number;         // Corresponds to `standard_id`
  grNo: string;               // Corresponds to `gr_no`
  saralId: string;            // Corresponds to `saral_id`
  studName: string;           // Corresponds to `stud_name`
  motherName: string;         // Corresponds to `mother_name`
  dob: Date;                  // Corresponds to `dob`
  gender: string;             // Corresponds to `gender`
  cast: string;               // Corresponds to `cast`
  aadhaar: string;            // Corresponds to `aadhaar`
  contactNo: string;          // Corresponds to `contact_no`
  studAddress: string;        // Corresponds to `stud_address`
  status?: string;            // Corresponds to `status`, optional since it defaults to 'Active'
  insDateTime: Date;          // Corresponds to `ins_date_time`
  updateDateTime: Date;       // Corresponds to `update_date_time`
  sickleCell?: string;        // Corresponds to `sickle_cell`, optional since it defaults to 'No'
  sickleReport: string;       // Corresponds to `sickle_report`
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
}
export type Padnam = {
  padnam_id: number; // Represents int(11)
  padnam: string;   // Represents varchar(50)
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
  yojana_year_id: number; // Represents int(11)
  yojana_year: string; // Represents varchar(20)
  is_delete: string; // Represents varchar(20) with default value 'No'
  year_status: string; // Represents varchar(10)
};


export type OpeningBalance = {
  open_bal_id: number; // Represents int(11)
  open_bal: any; // Change from number to Decimal
  year_id: number; // Represents int(11)
  status: string; // Represents varchar(10) with default value 'Active'
  ins_date_time: Date; // Represents datetime
  update_date_time: Date; // Represents datetime
};