// app/page.tsx
import Cluster from "@/app/[locale]/title/cluster"; import Loader from "@/common/Loader ";
;
import Clusteradd from "@/components/manage/Clusteradd";
import Notification from "@/components/manage/Notification";
import {  Notificationdata } from "@/components/type";
import prisma from "@/lib/db";
import React from "react";
import Notoficationtitle from "../../title/Notoficationtitle";

const Page = async () => {
  let notificationdata: Notificationdata[] = [];

  try {
    notificationdata = await prisma.notification.findMany(); // Fetch all clusters
  } catch (error) {
    console.error("Error fetching notification data:", error);
    return (
      <div>
        <h1>Error fetching Data</h1>
      </div>
    );
  }

  if (!notificationdata) {
    return (
      <>
        <Loader />
      </>
    )
  }

  return (
    <div>
      <h1 className="card card-body mt-5">
        <Notoficationtitle />
      </h1>
      <Notification initialnotificationdata={notificationdata} />
    </div>
  );
};

export default Page;
