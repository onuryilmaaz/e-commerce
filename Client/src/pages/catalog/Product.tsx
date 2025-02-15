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
import { useState } from "react";
import requests from "../../api/requests";
import { LoadingButton } from "@mui/lab";
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { currencyTRY } from "../../utils/FormatCurrency";

interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const { setCart } = useCartContext();

  function handleAddItem(productId: number) {
    setLoading(true);
    requests.Cart.addItem(productId)
      .then((cart) => {
        setCart(cart);
        toast.success("Sepetinize Eklendi");
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

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
        {/* <Button
          variant="outlined"
          size="small"
          color="success"
          startIcon={<AddShoppingCart />}
          onClick={() => handleAddItem(product.id)}
        >
          Add To Card
        </Button> */}

        <LoadingButton
          variant="outlined"
          size="small"
          color="success"
          loadingPosition="start"
          loading={loading}
          startIcon={<AddShoppingCart />}
          onClick={() => handleAddItem(product.id)}
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
