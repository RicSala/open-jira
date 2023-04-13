import { AppBar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { UIContext } from "../../context/ui";

export const NavBar = () => {
  const { openSidebar } = useContext(UIContext);

  return (
    <AppBar position="sticky" elevation={0}>
      <IconButton size="large" edge="start" onClick={openSidebar}>
        <MenuIcon />
      </IconButton>

      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
      ></Typography>
    </AppBar>
  );
};
