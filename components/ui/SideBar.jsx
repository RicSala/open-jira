import { InboxOutlined, MailOutline } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { UIContext } from "../../context/ui";

const menuItems = ["Inbox", "Starred", "Send Email", "Drafts"];

export const SideBar = (props) => {
  const { isSidebarOpen, closeSidebar } = useContext(UIContext);

  return (
    <Drawer
      anchor="left"
      open={isSidebarOpen}
      onClose={() => {
        closeSidebar();
      }}
    >
      <Box sx={{ width: 250 }}>
        <Box sx={{}}>
          <Typography variant="h4" color="primary">
            Menu
          </Typography>
        </Box>

        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxOutlined /> : <MailOutline />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxOutlined /> : <MailOutline />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
