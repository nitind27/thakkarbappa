import { ILayout, useLayout } from "@/layout/core";
import { useEffect } from "react";

const Footer = () => {
  const { config } = useLayout();
  useEffect(() => {
    updateDOM(config);
  }, [config]);
  return (
    <>
      <div className="text-gray-900 order-2 order-md-1 ">
        {/* <span className="text-muted fw-semibold me-1">
          {new Date().getFullYear().toString()}&copy;
        </span> */}
        <a
          href="#"
          target="_blank"
          className="text-gray-800 text-hover-primary"
        >
          Developed by WeClocks Technology Pvt. Ltd. @ 2024
        </a>
      </div>
    </>
  );
};

const updateDOM = (config: ILayout) => {
  if (config.app?.footer?.fixed?.desktop) {
    document.body.classList.add("data-kt-app-footer-fixed", "true");
  }

  if (config.app?.footer?.fixed?.mobile) {
    document.body.classList.add("data-kt-app-footer-fixed-mobile", "true");
  }
};

export { Footer };
