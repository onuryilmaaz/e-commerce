/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Grid2,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Info from "./Info";
import AddressFrom from "./AddressForm";
import PaymentFrom from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import requests from "../../api/requests";
import { useAppDispatch } from "../../store/store";
import { clearCart } from "../cart/cartSlice";
import { Link } from "react-router";

const steps = ["Teslimat Bilgileri", "Ödeme", "Sipariş Özeti"];
function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressFrom />;
    case 1:
      return <PaymentFrom />;
    case 2:
      return <Review />;
    default:
      throw new Error("Bilinmeyen bir hata");
  }
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const methots = useForm();
  const [orderId, setOrderId] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function handleNext(data: FieldValues) {
    if (activeStep === 2) {
      setLoading(true);
      try {
        setOrderId(await requests.Order.createOrder(data));
        setActiveStep(activeStep + 1);
        dispatch(clearCart());
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.log(error);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  }
  function handlePrevious() {
    setActiveStep(activeStep - 1);
  }

  return (
    <FormProvider {...methots}>
      <Paper>
        <Grid2 container spacing={5}>
          {activeStep !== steps.length && (
            <Grid2
              size={4}
              sx={{ borderRight: "1px solid", borderColor: "divider", p: 3 }}
            >
              <Info />
            </Grid2>
          )}

          <Grid2 size={activeStep !== steps.length ? 8 : 12} sx={{ p: 3 }}>
            <Box>
              <Stepper activeStep={activeStep} sx={{ height: 40, mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <Box>
              {activeStep === steps.length ? (
                <Stack spacing={2}>
                  <Typography variant="h1">📦</Typography>
                  <Typography variant="h5">
                    Teşekkür ederiz. Siparişinizi aldık.
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Sipariş numaranız <strong>#{orderId}</strong>. Siparişiniz
                    onaylandığında size bir eposta göndereceğiz.
                  </Typography>
                  <Button
                    sx={{
                      alignSelf: "start",
                      width: { xs: "100%", sm: "auto" },
                    }}
                    component={Link}
                    variant="contained"
                    to="/orders"
                  >
                    Siparişleri Listele
                  </Button>
                </Stack>
              ) : (
                <form onSubmit={methots.handleSubmit(handleNext)}>
                  {getStepContent(activeStep)}
                  <Box>
                    <Box
                      sx={[
                        { display: "flex" },
                        activeStep !== 0
                          ? { justifyContent: "space-between" }
                          : { justifyContent: "flex-end" },
                      ]}
                    >
                      {activeStep !== 0 && (
                        <Button
                          color="info"
                          startIcon={<ChevronLeftRounded />}
                          variant="contained"
                          onClick={handlePrevious}
                        >
                          Geri
                        </Button>
                      )}

                      <Button
                        loading={loading}
                        color="info"
                        type="submit"
                        startIcon={<ChevronRightRounded />}
                        variant="contained"
                      >
                        {activeStep == 2 ? "Siparişi Tamamla" : "İleri"}
                      </Button>
                    </Box>
                  </Box>
                </form>
              )}
            </Box>
          </Grid2>
        </Grid2>
      </Paper>
    </FormProvider>
  );
}
