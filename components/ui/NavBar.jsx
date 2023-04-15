import { AppBar, IconButton, Link, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { UIContext } from "../../context/ui";
import { useRouter } from "next/router";
import NextLink from "next/link";

export const NavBar = () => {
  const { openSidebar } = useContext(UIContext);
  const router = useRouter();

  // sends the user to "/" using the next router
  const onClick = () => {
    router.push("/");
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <IconButton size="large" edge="start" onClick={openSidebar}>
        <MenuIcon />
      </IconButton>

      <NextLink href="/" passHref>
        {/* <Link underline="none" color={"white"}> */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          color={"white"}
        >
          Open Jira
        </Typography>
        {/* </Link> */}
      </NextLink>
    </AppBar>
  );
};
