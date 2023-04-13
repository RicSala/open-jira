import { Box } from "@mui/material";
import Head from "next/head";
import { NavBar } from "../ui";
import { SideBar } from "../ui/SideBar";

export const Layout = ({ title = "Open Jira", children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      <NavBar />
      <SideBar />

      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
