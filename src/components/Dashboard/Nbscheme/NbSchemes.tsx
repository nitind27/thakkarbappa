import React from "react";

import Card from "@/common/Card";
import Link from "next/link";
import { useLocale } from "next-intl";

const NbSchemes = ({ yojanaYear, yojnaid }: any) => {
  const localActive = useLocale();

  return (
    <div>
      <Link
        href={`/${localActive}/dashboard/nbschemes/nbschemescategory/${yojnaid}`}
      >
        <Card
          title={yojanaYear}
          backgroundColor="#27222e"
          content={
            <>
              <div className="d-flex justify-content-between fs-6  w-100 ">
                <span
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {/* <div>{yojanaYear}</div> */}
                </span>
              </div>
            </>
          }
        />
      </Link>
    </div>
  );
};

export default NbSchemes;
