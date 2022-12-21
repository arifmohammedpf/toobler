import React, { useContext } from "react";
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import StatisticsCard from "../../components/StatisticsCard";
import UserList from "../../components/UserList";
import AlertComponent from "../../components/Alert";
import { AppContext } from "../../context/UserContext";
import Loader from "../../components/Loader";

const Home = () => {
  const { alert, userList, isUsersLoading } = useContext(AppContext);

  const statistics = userList?.reduce(
    (acc, user) => ({
      ...acc,
      [user.gender]: acc[user.gender] + 1,
      [user.status]: acc[user.status] + 1,
    }),
    {
      male: 0,
      female: 0,
      active: 0,
      inactive: 0,
    }
  );

  return (
    <Container sx={{ position: "relative" }}>
      <Loader isLoading={isUsersLoading} />
      {!!alert.message && <AlertComponent />}
      <Stack direction="row" spacing={3} my={3}>
        <StatisticsCard title="Total Users" value={userList.length} />
        <StatisticsCard title="Total Males" value={statistics.male} />
        <StatisticsCard title="Total Females" value={statistics.female} />
        <StatisticsCard title="Total Active" value={statistics.active} />
      </Stack>
      <UserList />
    </Container>
  );
};

export default Home;
