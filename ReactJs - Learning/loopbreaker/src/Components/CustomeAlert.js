import React from "react";

export default function CustomeAlert(props) {
  return (
    props.alert && (
      <>
        <div className="container">
          <div className="alert alert-success alert-dismissible fade show container my-4">
            <strong>Success!</strong>
            {" " + props.alert.msg}
          </div>
        </div>
      </>
    )
  );
}
