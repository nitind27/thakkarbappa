import { useState, useEffect } from "react";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { useLocale, useTranslations } from "next-intl";
import Loader from "@/common/Loader ";
import { usePathname } from "next/navigation";

const SidebarMenuMain = () => {
  const t = useTranslations("Sidebar");
  const localActive = useLocale();
  const router = usePathname();
  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // Function to handle click and store path in localStorage
  const handleItemClick = (path: string) => {
    setLoading(true);
    localStorage.setItem("currentPath", path);
  };
  // Effect to monitor the router/pathname and stop loading once the page is active
  useEffect(() => {
    const handleRouteChange = () => {
      // Stop loading once the route change is detected (i.e., page is active)
      setLoading(false);
    };

    // Listen for changes in the route (this ensures that the loader shows while the page is changing)
    router && handleRouteChange(); // Check if router/pathname is available to start checking

    return () => {
      // Cleanup if necessary
    };
  }, [router]); // This effect runs when the pathname changes

  useEffect(() => {
    localStorage.removeItem("schoolName");
    localStorage.removeItem("displayedNumber");
  }, [loading]);

  const supervisorName = sessionStorage.getItem("supervisorName");


  return (

    <>
      <div>
        {loading && <Loader />}

        <SidebarMenuItem
          to={`/${localActive}/dashboard`}
          icon="home"
          title={t("dashboard")}
          fontIcon="bi-app-indicator"
          onClick={() => handleItemClick(`/${localActive}/dashboard`)} // Store path on click
        />
        {
          supervisorName !== "Desk Clerk" && supervisorName !== "Cashier" &&
          <SidebarMenuItemWithSub
            to="/apps/chat"
            title={t("manage")}
            fontIcon="bi-chat-left"
            icon="burger-menu-2"
          >
            {/* List of Manage Submenu Items */}
            <SidebarMenuItem
              to={`/${localActive}/manage/cluster`}
              title={t("clustermenu")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/manage/cluster`)} // Store path on click
            />
            <SidebarMenuItem
              to={`/${localActive}/manage/town`}
              title={t("townmenu")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/manage/town`)} // Store path on click
            />
            <SidebarMenuItem
              to={`/${localActive}/manage/grampanchayat`}
              title={t("GramPanchayat")}
              hasBullet={true}
              onClick={() =>
                handleItemClick(`/${localActive}/manage/grampanchayat`)
              } // Store path on click
            />
            <SidebarMenuItem
              to={`/${localActive}/manage/mahsulgaav`}
              title={t("Mahsulgaav")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/manage/mahsulgaav`)} // Store path on click
            />
            <SidebarMenuItem
              to={`/${localActive}/manage/school`}
              title={t("school")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/manage/school`)} // Store path on click
            />
            <SidebarMenuItem
              to={`/${localActive}/manage/student`}
              title={t("student")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/manage/student`)} // Store path on click
            />
            <SidebarMenuItem
              to={`/${localActive}/manage/suvidha`}
              title={t("suvidha")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/manage/suvidha`)} // Store path on click
            />
            <SidebarMenuItem
              to={`/${localActive}/manage/representative`}
              title={t("pratinidhi")}
              hasBullet={true}
              onClick={() =>
                handleItemClick(`/${localActive}/manage/representative`)
              } // Store path on click
            />
            <SidebarMenuItem
              to={`/${localActive}/manage/supervisor`}
              title={t("vaparkarta")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/manage/supervisor`)} // Store path on click
            />
            <SidebarMenuItem
              to={`/${localActive}/manage/bank`}
              title={t("Bank")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/manage/bank`)} // Store path on click
            />
            <SidebarMenuItem
              to={`/${localActive}/manage/openingbalance`}
              title={t("PraranbhikSillak")}
              hasBullet={true}
              onClick={() =>
                handleItemClick(`/${localActive}/manage/openingbalance`)
              } // Store path on click
            />
            <SidebarMenuItem
              to={`/${localActive}/manage/slider`}
              title={'slider'}
              hasBullet={true}
              onClick={() =>
                handleItemClick(`/${localActive}/manage/slider`)
              } // Store path on click
            />
          </SidebarMenuItemWithSub>
        }

        {
          supervisorName == "Desk Clerk" &&
          <SidebarMenuItemWithSub
            to="/apps/chat"
            title={t("nbschemes")}
            fontIcon="bi-chat-left"
            icon="burger-menu-2"
          >
            {/* List of Manage Submenu Items */}
            <SidebarMenuItem
              to={`/${localActive}/yojna/schemes/category`}
              title={t("category")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/yojna/schemes/category`)} // Store path on click
            />
            <SidebarMenuItem
              to={`/${localActive}/yojna/schemes/subcategory`}
              title={t("subcategory")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/yojna/schemes/subcategor`)} // Store path on click
            />
            <SidebarMenuItem
              to={`/${localActive}/yojna/schemes/yojnatype`}
              title={t("Plan_type")}
              hasBullet={true}
              onClick={() =>
                handleItemClick(`/${localActive}/yojna/schemes/subcateyojnatypegory`)
              } // Store path on click
            />
            <SidebarMenuItem
              to={`/${localActive}/yojna/schemes/plans`}
              title={t("Plan")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/yojna/schemes/plans`)}
            />
            <SidebarMenuItem
              to={`/${localActive}/yojna/schemes/appplans`}
              title={t("App_plan")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/yojna/schemes/appplans`)}
            />
            <SidebarMenuItem
              to={`/${localActive}/yojna/schemes/beneficiary`}
              title={t("Beneficiary")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/yojna/schemes/beneficiary`)}
            />
            <SidebarMenuItem
              to={`/${localActive}/yojna/schemes/parivahan`}
              title={t("Sightseeing_Transport")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/yojna/schemes/parivahan`)}
            />

            <SidebarMenuItem
              to={`/${localActive}/manage/supervisor`}
              title={t("Costmatters")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/manage/supervisor`)}
            />
            <SidebarMenuItem
              to={`/${localActive}/yojna/schemes/bankmaster`}
              title={t("BankMaster")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/yojna/schemes/bankmaster`)}
            />


          </SidebarMenuItemWithSub>
        }
        {
          supervisorName !== "Desk Clerk" && supervisorName !== "Admin" &&
          <SidebarMenuItemWithSub
            to={`/${localActive}/workmaster`}
            title={t("workmaster")}
            fontIcon="bi-chat-left"
            icon="abstract-2"
          >
            {/* List of Manage Submenu Items */}
            <SidebarMenuItem
              to={`/${localActive}/workmaster`}
              title={t("Add")}
              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/workmaster`)}
            />
            <SidebarMenuItem
              to={`/${localActive}/disbursementfunds`}

              title={t("disbursementfunds")}

              hasBullet={true}
              onClick={() => handleItemClick(`/${localActive}/disbursementfunds`)}
            />
          </SidebarMenuItemWithSub>
        }
        {
          supervisorName !== "Desk Clerk" && supervisorName !== "Cashier" &&
          <SidebarMenuItem
            to={`/${localActive}/manage/studentlist`}
            icon="search-list"
            title={"Student List"}
            fontIcon="bi-app-notification"
            onClick={() => handleItemClick(`/${localActive}/disbursementfunds`)}
          />
        }
        {
          supervisorName !== "Desk Clerk" && supervisorName !== "Cashier" &&
          <SidebarMenuItem
            to={`/${localActive}/notification`}
            icon="notification"
            title={"Notification"}
            fontIcon="bi-app-notification"
            onClick={() => handleItemClick(`/${localActive}/disbursementfunds`)}
          />
        }
        {
          supervisorName !== "Desk Clerk" && supervisorName !== "Cashier" &&
          <SidebarMenuItem
            to={`/${localActive}/missionPeak`}
            icon="notification"
            title={"Mission Peak"}
            fontIcon="bi-app-notification"
            onClick={() => handleItemClick(`/${localActive}/missionPeak`)}
          />
        }
        {
          supervisorName !== "Desk Clerk" && supervisorName !== "Admin" &&
          <SidebarMenuItem
            to={`/${localActive}/anudaanadaa`}
            icon="notification"
            title={t("anudanadda")}
            fontIcon="bi-app-notification"
            onClick={() => handleItemClick(`/${localActive}/anudaanadaa`)}
          />
        }
        {
          supervisorName !== "Cashier" && supervisorName !== "Admin" &&
          <SidebarMenuItem
            to={`/${localActive}/manage/parivahanamountadd`}
            title={t("Nidhi_Ada_Transport")}
            icon="notification"

            fontIcon="bi-app-notification"
            onClick={() =>
              handleItemClick(`/${localActive}/manage/parivahanamountadd`)
            }
          />
        }
      </div>
    </>
  );
};

export { SidebarMenuMain };
