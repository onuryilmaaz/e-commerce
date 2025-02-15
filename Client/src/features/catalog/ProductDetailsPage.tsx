import {
  CircularProgress,
  Divider,
  Grid2,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "../../model/IProduct";
import requests from "../../api/requests";
import NotFound from "../../errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { toast } from "react-toastify";
import { currencyTRY } from "../../utils/FormatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setCart } from "../cart/cartSlice";

export default function ProductDetailsPage() {
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  const item = cart?.cartItems.find((i) => i.productId == product?.id);

  useEffect(() => {
    if (!id) return;
    requests.Catalog.details(parseInt(id))
      .then((data) => setProduct(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  function handleAddItem(id: number) {
    setIsAdded(true);
    requests.Cart.addItem(id)
      .then((cart) => {
        dispatch(setCart(cart));
        toast.success("Sepetinize Eklendi");
      })
      .catch((error) => console.log(error))
      .finally(() => setIsAdded(false));
  }

  if (loading) return <CircularProgress />;

  if (!product) return <NotFound />;

  return (
    <Grid2 container spacing={6}>
      <Grid2 size={{ xl: 3, lg: 4, md: 5, sm: 6, xs: 12 }}>
        <img
          src={`http://localhost:5093/images/${product.imageUrl}`}
          style={{ width: "100%" }}
        />
      </Grid2>
      <Grid2 size={{ xl: 9, lg: 8, md: 7, sm: 6, xs: 12 }}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2, mt: 2 }} />
        <Typography variant="h4" color="secondary">
          {currencyTRY.format(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" spacing={5} sx={{ mt: 5 }} alignItems="center">
          <LoadingButton
            variant="outlined"
            loadingPosition="start"
            startIcon={<AddShoppingCart />}
            loading={isAdded}
            onClick={() => handleAddItem(product.id)}
          >
            Sepete Ekle
          </LoadingButton>
          {item && item.quantity && item.quantity > 0 && (
            <Typography variant="body1">
              Sepetinize {item.quantity} adet eklendi.
            </Typography>
          )}
        </Stack>
      </Grid2>
    </Grid2>
  );
}
