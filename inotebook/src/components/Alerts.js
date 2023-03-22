import React from "react";
import Alert from "react-bootstrap/Alert";

const Alerts = () => {
  return (
    <>
      <Alert key="primary" variant="primary" className="my-3">
        This is a "primary" alert—check it out!
      </Alert>
    </>
  );
};

export default Alerts;
