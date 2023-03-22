import React from "react";
import Image from "react-bootstrap/Image";
import Spinner from "./Spinner.gif";

const Loading = () => {
  return (
    <div className="text-center">
      <Image srcSet={Spinner} roundedCircle/>
    </div>
  ); 
}

export default Loading