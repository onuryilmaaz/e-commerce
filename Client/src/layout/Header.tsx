import { KeyboardArrowDown, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Fade,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router";
import { logout } from "../features/account/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearCart } from "../features/cart/cartSlice";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

const links = [
  { title: "Home", to: "/" },
  { title: "Catalog", to: "/catalog" },
  { title: "About", to: "/about" },
  { title: "Contact", to: "/contact" },
  { title: "ErrorPage", to: "/error" },
];

const authLinks = [
  { title: "Login", to: "/login" },
  { title: "Register", to: "/register" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "text.primary",
  },
  "&.active": {
    color: "warning.main",
  },
};

export default function Header() {
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const itemCount = cart?.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleMenuClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Stack direction="row">
                {links.map((link) => (
                  <Button
                    key={link.to}
                    component={NavLink}
                    sx={navStyles}
                    to={link.to}
                  >
                    {link.title}
                  </Button>
                ))}
              </Stack>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                component={Link}
                to="/cart"
                size="large"
                edge="start"
                color="inherit"
              >
                <Badge badgeContent={itemCount} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              {user ? (
                <>
                  <Button
                    id="user-button"
                    onClick={handleMenuClick}
                    endIcon={<KeyboardArrowDown />}
                    sx={navStyles}
                  >
                    {user.name}
                  </Button>
                  <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem component={Link} to="/orders" sx={{ pr: 4 }}>
                      <ListItemIcon>
                        <PaymentIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Orders</ListItemText>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      ></Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        dispatch(logout());
                        dispatch(clearCart());
                      }}
                    >
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Stack direction="row">
                  {authLinks.map((link) => (
                    <Button
                      key={link.to}
                      component={NavLink}
                      sx={navStyles}
                      to={link.to}
                    >
                      {link.title}
                    </Button>
                  ))}
                </Stack>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
