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
          {...register("card_name", { required: "Card name is required" })}
          label="Enter Card Name"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.card_name}
        ></TextField>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("card_number", { required: "Card Number is required" })}
          label="Enter Card Number"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.card_number}
        ></TextField>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("card_expiry_date", {
            required: "Expriy Date is required",
          })}
          label="Enter Expriy Date"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.card_expiry_date}
        ></TextField>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("card_cvv", { required: "Cvv is required" })}
          label="Enter Cvv"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.card_cvv}
        ></TextField>
      </Grid2>
    </Grid2>
  );
}
