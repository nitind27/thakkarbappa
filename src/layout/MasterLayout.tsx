"use client";
import { useEffect } from "react";
import { ScrollTop } from "@/components/scroll-top";
import { FooterWrapper } from "@/components/footer";
import { Sidebar } from "@/components/sidebar";

import { PageDataProvider } from "./core";

import { usePathname } from "next/navigation";
import { reInitMenu } from "@/_metronic/helpers";
import { HeaderWrapper } from "@/components/header";

const MasterLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  useEffect(() => {
    reInitMenu();
  }, [pathname]);

  return (
    <PageDataProvider>
      <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
        <div
          className="app-page flex-column flex-column-fluid"
          id="kt_app_page"
        >
          <HeaderWrapper />
          <div
            className="app-wrapper flex-column flex-row-fluid"
            id="kt_app_wrapper"
          >
            <Sidebar />
            <div
              className="app-main flex-column flex-row-fluid"
              id="kt_app_main"
            >
              <div className="app-container container-xxl d-flex flex-column flex-column-fluid">
                {children}
              </div>
              <FooterWrapper />
            </div>
          </div>
        </div>
      </div>

      <ScrollTop />
    </PageDataProvider>
  );
};

export { MasterLayout };
