import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";

const StatisticsCard = ({ title, value }) => {
  return (
    <Paper sx={{ padding: "10px" }}>
      <Typography>{title}</Typography>
      <Typography>{value}</Typography>
    </Paper>
  );
};

export default StatisticsCard;
