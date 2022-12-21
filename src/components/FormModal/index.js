import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { AppContext } from "../../context/UserContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  name: "",
  email: "",
  gender: "",
  status: "active",
};

const initialErrors = {
  name: "",
  email: "",
  gender: "",
};

const FormModal = ({ openFormModal, setOpenFormModal }) => {
  const { setAlert } = useContext(AppContext);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);

  const handleClose = () => {
    setValues(initialValues);
    setErrors(initialErrors);
    setOpenFormModal(false);
  };

  const handleChange = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    Object.entries(values).forEach(([key, val]) => {
      if (!val) {
        setErrors((prev) => ({ ...prev, [key]: "is required" }));
        isValid = false;
      }
    });
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
      setErrors((prev) => ({ ...prev, email: "enter valid email" }));
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = () => {
    setErrors(initialErrors);
    const isValid = validateForm();
    if (!isValid) return;

    fetch(process.env.REACT_APP_CREATE_USER_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then(() => {
        setAlert({
          message: "Form Submitted Successfully",
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          message: error.message,
          type: "error",
        });
        handleClose();
      });
  };

  return (
    <Modal
      open={openFormModal}
      onClose={handleClose}
      aria-labelledby="add-user-modal"
    >
      <Box sx={style}>
        <Typography mb={3}>Add new user</Typography>
        <Stack spacing={3}>
          <TextField
            id="name"
            label="Name"
            fullWidth
            placeholder="Please enter name"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            fullWidth
            placeholder="Please enter email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={values.gender}
              label="Gender"
              onChange={(e) => handleChange("gender", e.target.value)}
              error={!!errors.gender}
              helperText={errors.gender}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel id="status-radio">Choose Status</FormLabel>
            <RadioGroup
              aria-labelledby="status-radio"
              name="radio-buttons-group"
              value={values.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <FormControlLabel
                value="active"
                control={<Radio />}
                label="Active"
              />
              <FormControlLabel
                value="inactive"
                control={<Radio />}
                label="Inactive"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={3} mt={2}>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button
            onClick={() => {
              setValues(initialValues);
              setErrors(initialErrors);
            }}
          >
            Clear
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
export default FormModal;
