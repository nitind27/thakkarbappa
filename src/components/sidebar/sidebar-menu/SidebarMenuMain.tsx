import { useState, useEffect } from "react";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { useLocale, useTranslations } from "next-intl";
import Loader from "@/common/Loader ";

const SidebarMenuMain = () => {
  const t = useTranslations("Sidebar");
  const localActive = useLocale();

  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // Function to handle click and store path in localStorage
  const handleItemClick = (path: string) => {
    if (typeof window !== "undefined") {
      // Ensure this runs only on the client-side

      // Set loading to true and start a timer to reset it after 3 seconds
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  useEffect(() => {
    localStorage.removeItem("schoolName");
    localStorage.removeItem("displayedNumber");
  }, [loading]);

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
        </SidebarMenuItemWithSub>

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
            onClick={() => handleItemClick(`/${localActive}/yojna/schemes/plans`)} // Store path on click
          />
          <SidebarMenuItem
            to={`/${localActive}/yojna/schemes/appplans`}
            title={t("App_plan")}
            hasBullet={true}
            onClick={() => handleItemClick(`/${localActive}/yojna/schemes/appplans`)} // Store path on click
          />
          <SidebarMenuItem
            to={`/${localActive}/yojna/schemes/beneficiary`}
            title={t("Beneficiary")}
            hasBullet={true}
            onClick={() => handleItemClick(`/${localActive}/yojna/schemes/beneficiary`)} // Store path on click
          />
          <SidebarMenuItem
            to={`/${localActive}/yojna/schemes/parivahan`}
            title={t("Sightseeing_Transport")}
            hasBullet={true}
            onClick={() => handleItemClick(`/${localActive}/yojna/schemes/parivahan`)} // Store path on click
          />
          <SidebarMenuItem
            to={`/${localActive}/manage/representative`}
            title={t("Nidhi_Ada_Transport")}
            hasBullet={true}
            onClick={() =>
              handleItemClick(`/${localActive}/manage/representative`)
            } // Store path on click
          />
          <SidebarMenuItem
            to={`/${localActive}/manage/supervisor`}
            title={t("Costmatters")}
            hasBullet={true}
            onClick={() => handleItemClick(`/${localActive}/manage/supervisor`)} // Store path on click
          />

        </SidebarMenuItemWithSub>
        {/* Disbursement Funds Menu Item */}
        <SidebarMenuItem
          to={`/${localActive}/disbursementfunds`}
          icon="home"
          title={t("disbursementfunds")}
          fontIcon="bi-app-indicator"
          onClick={() => handleItemClick(`/${localActive}/disbursementfunds`)} // Store path on click
        />
        <SidebarMenuItem
          to={`/${localActive}/notification`}
          icon="notification"
          title={"Notification"}
          fontIcon="bi-app-notification"
          onClick={() => handleItemClick(`/${localActive}/disbursementfunds`)} // Store path on click
        />
      </div>
    </>
  );
};

export { SidebarMenuMain };