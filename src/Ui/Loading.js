import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex place-content-center my-auto">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#2a2185"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
