import React from "react";
import Image from "react-bootstrap/Image";
import Spinner from "./Spinner.gif";

export default function Loading() {
  return (
    <div className="text-center">
      <Image style={{height:'200px',width:'250px'}} srcSet={Spinner} roundedCircle/>
    </div>
  );
}
