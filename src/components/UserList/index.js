import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CustomTable from "../Table";
import { AppContext } from "../../context/UserContext";
import FormModal from "../FormModal";

const UserList = () => {
  const { setIsUsersLoading, setUserList, userList, setAlert } =
    useContext(AppContext);

  const [openFormModal, setOpenFormModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsUsersLoading(true);
    fetch(process.env.REACT_APP_LIST_USER_API)
      .then((res) => res.json())
      .then(
        (result) => {
          if (isMounted) {
            setUserList(result.data);
          }
        },
        (error) => {
          setAlert({
            message: error.message,
            type: "error",
          });
        }
      )
      .then(() => {
        setIsUsersLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [setAlert, setIsUsersLoading, setUserList]);

  return (
    <>
      <FormModal
        setOpenFormModal={setOpenFormModal}
        openFormModal={openFormModal}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Users List</Typography>
        <Button onClick={() => setOpenFormModal(true)}>Add New User</Button>
      </Stack>
      <CustomTable
        rows={!!userList.length ? userList : []}
        columns={["id", "name", "email", "gender", "status"]}
      />
    </>
  );
};

export default UserList;
