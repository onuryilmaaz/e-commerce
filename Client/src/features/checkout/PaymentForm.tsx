import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentFrom() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardname", { required: "Card name is required" })}
          label="Enter Card Name"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.cardname}
        ></TextField>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardnumber", { required: "Card Number is required" })}
          label="Enter Card Number"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.cardnumber}
        ></TextField>
      </Grid2>
      <Grid2 size={{ xs: 6, md: 4 }}>
        <TextField
          {...register("cardexpiremonth", {
            required: "Expriy Month is required",
          })}
          label="Enter Expriy Month"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.cardexpiremonth}
        ></TextField>
      </Grid2>
      <Grid2 size={{ xs: 6, md: 4 }}>
        <TextField
          {...register("cardexpireyear", {
            required: "Expriy Year is required",
          })}
          label="Enter Expriy Year"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.cardexpireyear}
        ></TextField>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <TextField
          {...register("cardcvv", { required: "Cvv is required" })}
          label="Enter Cvv"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.cardcvv}
        ></TextField>
      </Grid2>
    </Grid2>
  );
}
