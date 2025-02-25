import TitleCard from "@/app/[locale]/title/breadcums/Titilecard";
import SchoolDashboard from "@/components/Dashboard/SchoolManage/SchoolDashboard";
import SportDashboard from "@/components/Dashboard/Sports/SportDashboard";
import { Schooldata, StudentData, TblSports, TblSportsInfoNew } from "@/components/type";
import prisma from "@/lib/db";

const page = async () => {
    let sportsdata: TblSports[] = [];
    let studentdata: StudentData[] = [];
    let sportsinfo: TblSportsInfoNew[] = [];
    try {
        sportsdata = await prisma.tblSports.findMany();
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

    return (
        <div>
            <div className="card mt-5 p-3">
                <TitleCard breadcrumbs={breadcrumbs} />

            </div>
            <div className="container mt-5">
                <div className="row col-lg-12">
                    {sportsdata.map((school, index) => {
                        // // Filter students for the current school
                        const filteredStudents = sportsinfo.filter(
                            (student) => student.sports_record.split("|")[0] == school.sports_id as any // Use the current school's ID
                        );

                        return (
                            <div className="col-md-3 mb-2" key={index}>
                                <SportDashboard
                                    members={school.sports_id} // Assuming you will populate this later
                                    schoolname={school.sports_name} // Use the school_name property
                                    totalstudent={school.icon} // You might want to fetch this data as well
                                    curruntstudent={filteredStudents.length} // Count of current students for this school
                                    stddata={filteredStudents}
                                    index={index + 1}
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
