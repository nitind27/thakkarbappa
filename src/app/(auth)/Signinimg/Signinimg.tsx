import { toAbsoluteUrl } from "@/_metronic/helpers";
import Image from "next/image";
import img from "/public/media/logos/loginlogo.png";
const SignInImg = () => {
  return (
    <div className="d-flex h-100 flex-column flex-root" id="kt_app_root">
      <div className="d-flex flex-column flex-lg-row flex-column-fluid">
        <div className="d-flex flex-lg-row-fluid">
          <div className="d-flex flex-column flex-center pb-0 pb-lg-10 p-10 w-100">
            <Image
              src={img}
              height={450}
              width={450}
              alt="logo"
              className="mx-auto mw-100  mb-5 mb-lg-2"
            />

            <h1 className="text-gray-800 fs-2qx fw-bold text-center mb-7">
              Fast, Efficient and Productive...
            </h1>
            <div
              style={{ color: "#78829d" }}
              className=" text-gray w-600px fs-4 text-center fw-semibold"
            >
              {/* In this kind of post, the blogger introduces a person they’ve
              interviewed and provides some background information about the
              interviewee and their work following this is a transcript of the
              interview. */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInImg;
