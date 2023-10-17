import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const Card = (props) => {
  const [timer, setTimer] = useState(true);
  useEffect(() => {
    const data = () => {
      setTimeout(() => {
        setTimer(false);
      }, 1000);
    };
    data();
  }, []);
  return (
    <div className="lg:ml-80 ml-0 min-h-screen p-4 grid animate-card origin-top">
      {timer ? <Loading /> : <div>{props.children}</div>}
    </div>
  );
};

export default Card;
