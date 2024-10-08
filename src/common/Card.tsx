import React from "react";

type CardProps = {
  title: string;
  content: React.ReactNode;
  backgroundColor?: string;
};

const Card = ({ title, content, backgroundColor }: CardProps) => {
  return (
    <div
      className="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end h-md-100 mb-5 mb-xl-10"
      style={{
        backgroundColor,
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        padding: "20px",
      }}
    >
      <div className="card-header pt-4 d-flex justify-content-center">
        <h2 className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2 text-center">
          <span
            style={{
              fontSize: "80px",
            }}
          >
            {title}
          </span>
        </h2>
      </div>
      <div className="card-header pt-4 d-flex justify-content-center">
        <h2 className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2 text-center">
          <span>{content}</span>
        </h2>
      </div>
    </div>
  );
};

export default Card;
