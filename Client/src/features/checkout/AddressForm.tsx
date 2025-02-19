import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AddressFrom() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("firstname", { required: "firstname is required" })}
          label="Enter Firstname"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.firstname}
        ></TextField>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("lastname", { required: "lastname is required" })}
          label="Enter Lastname"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.lastname}
        ></TextField>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("phone", { required: "phone is required" })}
          label="Enter Phone"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.phone}
        ></TextField>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("city", { required: "city is required" })}
          label="Enter City"
          fullWidth
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.city}
        ></TextField>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <TextField
          {...register("addressline", { required: "addressline is required" })}
          label="Enter Addressline"
          fullWidth
          multiline
          rows={4}
          autoFocus
          size="small"
          sx={{ mb: 2 }}
          error={!!errors.addressline}
        ></TextField>
      </Grid2>
    </Grid2>
  );
}
