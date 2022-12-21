import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import { AppContext } from "../../context/UserContext";

const AlertComponent = () => {
  const { setAlert, alert } = useContext(AppContext);

  return (
    <Alert
      onClose={() => {
        setAlert({
          message: "",
          type: "",
        });
      }}
      severity={alert.type}
    >
      {alert.message}
    </Alert>
  );
};

export default AlertComponent;
