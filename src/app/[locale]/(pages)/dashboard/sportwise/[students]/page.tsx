import TitleCard from "@/app/[locale]/title/breadcums/Titilecard";
import Cluster from "@/app/[locale]/title/cluster";
import CardSchool from "@/components/Dashboard/SchoolManage/CardSchool";
import Sporttable from "@/components/Dashboard/Sports/Sporttable";
import { Patsankhya, Schooldata, StudentData, TblSports, TblSportsInfoNew } from "@/components/type";
import prisma from "@/lib/db";
import React from "react";

const Page = async ({ params }: any) => {
    const { students } = params;
    const { indexId } = params;
    let studentdata: StudentData[] = [];
    let schooldata: Schooldata[] = [];
    let patsankya: Patsankhya[] = [];
    let sportsInfo: TblSportsInfoNew[] = [];
    let tblSports: TblSports[] = [];

    try {
        sportsInfo = await prisma.sportsInfo.findMany();
        tblSports = await prisma.tblSports.findMany();
        schooldata = await prisma.school.findMany();
        studentdata = await prisma.student.findMany(); // Fetch all students
        patsankya = await prisma.patsankhya.findMany(); // Fetch all students
    } catch (error) {
        console.error("Error fetching cluster data:", error);
        return (
            <div>
                <h1>Error fetching Data</h1>
            </div>
        );
    }

    const breadcrumbs = [

        { label: 'dashboard', href: '/dashboard' },
        { label: 'school', href: '/dashboard/school' },
        { label: 'schoolwisestudents', href: `/dashboard/schoolwisestudents/${students}/${indexId}` },

    ];
    const filtersportsInfo = sportsInfo.filter((data) => data.sports_record.split("|")[0] == students)
    return (
        <div>
            <div className="container mt-5 card card-body col-lg-12 mb-5">
                <div className=" d-flex justify-content-between ">

                    <div>
                        <TitleCard breadcrumbs={breadcrumbs} />
                    </div>



                </div>
            </div>


            <Sporttable filtersportsInfo={filtersportsInfo} studentdata={studentdata} schooldata={schooldata} />
        </div>
    );
};

export default Page;
