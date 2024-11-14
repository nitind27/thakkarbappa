import NbCard from "@/components/Dashboard/Nbscheme/NbCard";
import DashbordCard from "@/components/Dashboard/SchoolManage/DashbordCard";
import Thakkarcard from "@/components/Dashboard/Thakkarbappa/Thakkarcard";
import { useLocale } from "next-intl";
import Link from "next/link";

const Page = () => {
  // Renamed 'page' to 'Page'
  const localActive = useLocale();
  return (
    <div>
      <div className="container mt-5">
        <div className="row col-lg-12">
          <div className="col-md-3">
            <Link href={`/${localActive}/dashboard/nbschemes`}>
              <NbCard />
            </Link>
          </div>
          <div className="col-md-3">
            <Link href={`/${localActive}/dashboard/school`}>
              <DashbordCard />
            </Link>
          </div>
          <div className="col-md-3">
            <Link href={`/${localActive}/dashboard`}>
              <Thakkarcard />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page; // Ensure to export the renamed component
