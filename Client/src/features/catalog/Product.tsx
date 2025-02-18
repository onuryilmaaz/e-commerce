import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IProduct } from "../../model/IProduct";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router";
import { LoadingButton } from "@mui/lab";
import { currencyTRY } from "../../utils/FormatCurrency";
import { addItemToCart } from "../cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  const { status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardMedia
        sx={{ height: 160, backgroundSize: "contain" }}
        image={`http://localhost:5093/images/${product.imageUrl}`}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          color="text.secondary"
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="secondary">
          {currencyTRY.format(product.price)}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          variant="outlined"
          size="small"
          color="success"
          loadingPosition="start"
          loading={status === "pendingAddItem" + product.id}
          startIcon={<AddShoppingCart />}
          onClick={() => dispatch(addItemToCart({ productId: product.id }))}
        >
          Add To Card
        </LoadingButton>

        <Button
          component={Link}
          to={`/catalog/${product.id}`}
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<SearchIcon />}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
