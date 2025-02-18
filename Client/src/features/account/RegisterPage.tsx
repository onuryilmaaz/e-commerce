/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router";
import requests from "../../api/requests";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  async function submitForm(data: FieldValues) {
    requests.Account.register(data)
      .then(() => {
        toast.success("User Created");
        navigate("/login");
      })
      .catch((result) => {
        const { data: errors } = result;
        errors.foreach((error: any) => {
          if (error.code == "DuplicateUserName") {
            setError("username", { message: error.description });
          } else if (error.code == "DuplicateEmail") {
            setError("email", { message: error.description });
          }
        });
      });
  }

  return (
    <Container maxWidth="xs">
      <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
        <Avatar
          sx={{
            mx: "auto",
            color: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          noValidate
          sx={{ mt: 2 }}
        >
          <TextField
            {...register("username", { required: "Username is required" })}
            label="Enter Username"
            fullWidth
            autoFocus
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.username}
            helperText={errors.username?.message}
          ></TextField>
          <TextField
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Email is not valid",
              },
            })}
            label="Enter Name"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.name}
            helperText={errors.name?.message}
          ></TextField>
          <TextField
            {...register("email", { required: "Email is required" })}
            label="Enter Email"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.email}
            helperText={errors.email?.message}
          ></TextField>
          <TextField
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min length is 6 characters" },
            })}
            label="Enter Password"
            type="password"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.password}
            helperText={errors.password?.message}
          ></TextField>

          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
          >
            Register
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  );
}
