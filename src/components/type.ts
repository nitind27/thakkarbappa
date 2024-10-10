import { Decimal } from 'decimal.js'; // Import Decimal if using a library

export type clusterdata = {
    cluster_id: number;
    cluster_name: string;
    status: string;
    ins_date_time: Date;

    update_date_time?: Date | null; // Nullable field

};


export type talukasdata = {

    id: BigInt;
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
    arthik_maryada: Decimal; // Change this to Decimal
    village_type: string;
    status?: string;
    // created_at: Date;
    // updated_at?: Date | null;
};