"use client";
// import { FC } from "react";
// import clsx from "clsx";

// import { useLayout } from "../../../core";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { KTIcon } from "@/_metronic/helpers/components/KTIcon";
// import { WithChildren, checkIsActive } from "@/_metronic/helpers";

// type Props = {
//   to: string;
//   title: string;
//   icon?: string;
//   fontIcon?: string;
//   hasBullet?: boolean;
// };

// const SidebarMenuItem: FC<Props & WithChildren> = ({
//   children,
//   to,
//   title,
//   icon,
//   fontIcon,
//   hasBullet = false,
// }) => {
//   const pathname = usePathname();
//   const isActive = checkIsActive(pathname, to);
//   const { config } = useLayout();
//   const { app } = config;

//   return (
//     <div className="menu-item bg-light">
//       <Link
//         className={clsx("menu-link without-sub bg-light", {
//           active: isActive,
//           "text-blue": isActive,
//         })}
//         href={to}
//       >
//         {icon && app?.sidebar?.default?.menu?.iconType === "svg" && (

//             <KTIcon
//               iconName={icon}
//               className={clsx("fs-2  me-2", { "text-blue": isActive })}
//             />

//         )}
//         {fontIcon && app?.sidebar?.default?.menu?.iconType === "font" && (
//           <i className={clsx("bi text-muted ", fontIcon)}></i>
//         )}
//         <div
//           className={clsx("text-gray-700  title-menu menu-title fs-6", {
//             "text-blue": isActive,
//           })}
//         >
//           {title}
//         </div>
//       </Link>
//       {children}
//     </div>
//   );
// };

// export { SidebarMenuItem };

"use client";
import { FC } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { KTIcon } from "@/_metronic/helpers/components/KTIcon";
import { WithChildren, checkIsActive } from "@/_metronic/helpers";
import { useLayout } from "@/layout/core";

type Props = {
  to: string;
  title: string;
  icon?: string;
  fontIcon?: string;
  hasBullet?: boolean;
};

const SidebarMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
}) => {
  const pathname = usePathname();
  const isActive = checkIsActive(pathname, to);
  const { config } = useLayout();
  const { app } = config;

  return (
    <div className="menu-item rounded-2 border-0">
      <Link
        className={clsx("menu-link ", {
          active: isActive,
          "text-light": isActive,
        })}
        href={to}
      >
        {hasBullet && (
          <span className="menu-icon">
            {/* <span className='bullet bullet-dot'></span> */}
          </span>
        )}
        {icon && app?.sidebar?.default?.menu?.iconType === "svg" && (
          <span className="menu-icon">
            {" "}
            <KTIcon
              iconName={icon}
              className={clsx("fs-2 text-gray-600  me-2", {
                "text-blue": isActive,
              })}
            />
          </span>
        )}
        {fontIcon && app?.sidebar?.default?.menu?.iconType === "font" && (
          <i className={clsx("bi fs-3", fontIcon)}></i>
        )}
        <div
          className={clsx(" menu-title text-light fs-6", {
            "text-light": isActive,
          })}
        >
          {title}
        </div>
      </Link>
      {children}
    </div>
  );
};

export { SidebarMenuItem };
