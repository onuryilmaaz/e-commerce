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
import { loginUser } from "./accountSlice";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../store/store";
import { getCart } from "../cart/cartSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function submitForm(data: FieldValues) {
    await dispatch(loginUser(data));
    await dispatch(getCart());
    navigate("/catalog");
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
          Login
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
            required
            autoFocus
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.username}
            helperText={errors.username?.message}
          ></TextField>
          <TextField
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min length is 6 characters" },
            })}
            label="Enter Password"
            type="password"
            fullWidth
            required
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
            Login
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  );
}
