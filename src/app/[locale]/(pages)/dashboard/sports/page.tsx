import TitleCard from "@/app/[locale]/title/breadcums/Titilecard";
import SchoolDashboard from "@/components/Dashboard/SchoolManage/SchoolDashboard";
import SportDashboard from "@/components/Dashboard/Sports/SportDashboard";
import Sportsexcle from "@/components/Dashboard/Sports/Sportsexcle";
import { Schooldata, Standarddata, StudentData, TblAchivments, TblSports, TblSportsInfoNew } from "@/components/type";
import prisma from "@/lib/db";

const page = async () => {
    let sportsdata: TblSports[] = [];
    let studentdata: StudentData[] = [];
    let sportsinfo: TblSportsInfoNew[] = [];
    let schooldata: Schooldata[] = [];
    let standarddata: Standarddata[] = [];
    let TblAchivments: TblAchivments[] = [];

    try {
        sportsdata = await prisma.tblSports.findMany();
        standarddata = await prisma.standard.findMany();
        schooldata = await prisma.school.findMany();
        TblAchivments = await prisma.tbl_achivments.findMany();
        studentdata = await prisma.student.findMany(); // Fetch all students
        sportsinfo = await prisma.sportsInfo.findMany(); // Fetch all students
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
        { label: 'sports', href: '/dashboard/sports' },

    ];


    // const studentdatas = studentdata.filter((data)=>data.student_id == sportsinfo.map((sports)=>sports.sports_record.split["|"][1]))
    return (
        <div>
            <div className="container mt-5 card card-body col-lg-12 mb-5">
                <div className="d-flex justify-content-between ">

                    <div>

                        <TitleCard breadcrumbs={breadcrumbs} />
                    </div>
                    <div>

                        <Sportsexcle
                            members={[]} // Assuming you will populate this later
                            sportsdata={sportsdata} // Use the school_name property
                            totalstudent={[]} // You might want to fetch this data as well
                            curruntstudent={[]} // Count of current students for this school
                            stddata={[]}
                            sportsinfo={sportsinfo}
                            index={[]}
                            studentdata={studentdata} schooldata={schooldata}
                            standarddata={standarddata}
                            TblAchivments={TblAchivments} />
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row col-lg-12">
                    {sportsdata.map((school, index) => {

                        // // Filter students for the current school
                        const filteredStudents = sportsinfo.filter((student) => {
                            const studentsdatas = studentdata.filter((datas) => datas.student_id == student.sports_record.split("|")[1] as any && datas.admitted_in_std !== 0 && datas.current_std !== 0 && datas.status == "Active" && datas.school_id !== 0 && datas.type_of_students !== null && datas.dropout == 'Not' || 'Transfer')
                            const sportsRecord = student.sports_record.replace(/,/g, "|"); // Normalize the record
                            const splitRecord = sportsRecord.split("|"); // Split by pipes
                            return splitRecord[0] == school.sports_id as any; // Compare the first element
                        });


                        return (
                            <div className="col-md-3 mb-2" key={index}>
                                <SportDashboard
                                    members={school.sports_id} // Assuming you will populate this later
                                    schoolname={school.sports_name} // Use the school_name property
                                    totalstudent={school.icon} // You might want to fetch this data as well
                                    curruntstudent={filteredStudents.length} // Count of current students for this school
                                    stddata={filteredStudents}
                                    sportsinfo={sportsinfo}
                                    index={index + 1}
                                    studentdata={studentdata} schooldata={schooldata}
                                    standarddata={standarddata}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default page;
