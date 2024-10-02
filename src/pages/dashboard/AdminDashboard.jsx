import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import AppLogo from "../../assets/logo/AppLogo";
import "./AdminDashboard.scss";
import HomeIcon from "@mui/icons-material/Home";
import ProductIcon from "@mui/icons-material/Store";
import MembersIcon from "@mui/icons-material/Group";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import ReportIcon from "@mui/icons-material/Assessment";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SalesTargetIcon from "@mui/icons-material/TrendingUp";
import StockIcon from "@mui/icons-material/Inventory";
import RolesIcon from "@mui/icons-material/AssignmentInd";
import { Avatar } from "@mui/material";
import UserProfile from "./UserProfile"; // Import UserProfile component

// Drawer width
const drawerWidth = 240;
// const drawerWidth = 300;

// Mixin for opened Drawer
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#F1F3FF",
});

// Mixin for closed Drawer
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#F1F3FF",
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Styled DrawerHeader
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// Styled AppBar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#F1F3FF",
  boxShadow: "none",
  padding: "0 16px",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Styled Drawer
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// Main AdminDashboard component
export default function AdminDashboard() {
  const theme = useTheme();
  const matches = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = React.useState(matches);
  const [openExpand, setOpenExpand] = React.useState({});
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    setOpen(matches);
  }, [matches]);

  React.useEffect(() => {
    // Automatically expand the menu item that matches the current route
    const path = location.pathname;
    const defaultExpand = menuItems.find(
      (item) =>
        item.subItems && item.subItems.some((subItem) => subItem.path === path)
    );
    if (defaultExpand) {
      setOpenExpand((prev) => ({
        ...prev,
        [defaultExpand.text]: true,
      }));
    }
  }, [location.pathname]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleAvatarClick = () => {
    navigate("/dashboard/profile");
    setShowProfile(!showProfile); // Toggle profile visibility
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (text) => {
    setOpenExpand((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [text]: !prev[text],
    }));
    // Navigate to the default route of the selected item
    const selectedItem = menuItems.find((item) => item.text === text);
    if (selectedItem && selectedItem.subItems) {
      const defaultSubItem = selectedItem.subItems.find((sub) => sub.default);
      if (defaultSubItem) {
        navigate(defaultSubItem.path);
      }
    } else if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  const handleItemClick = (path) => {
    navigate(path);
  };

  // const handleProfileClick = (path) => {
  //   navigate("dashboard/profile");
  // };

  ///
  const menuItems = [
    {
      text: "HomePage",
      path: "/dashboard",
      icon: <HomeIcon />,
    },
    {
      text: "Products",
      path: "/dashboard/products",
      icon: <ProductIcon />,
    },
    {
      text: "Members",
      path: "/dashboard/members",
      icon: <MembersIcon />,
    },
    {
      text: "Announcement",
      path: "/dashboard/announcement",
      icon: <AnnouncementIcon />,
    },
    {
      text: "Report",
      path: "/dashboard/report",
      icon: <ReportIcon />,
      // subItems: [
      //   {
      //     text: "EX1",
      //     path: "/dashboard/ex1",
      //     default: true,
      //     icon: <AdminPanelSettingsIcon />,
      //   },
      //   { text: "EX2", path: "/dashboard/ex2", icon: <SalesTargetIcon /> },
      // ],
    },
    {
      text: "Documents",
      path: "/dashboard/documents",
      icon: <AnnouncementIcon />,
    },
    {
      text: "Requests",
      // path: '/dashboard/report',
      icon: <AnnouncementIcon />,
      subItems: [
        {
          text: "Edit Request",
          path: "/dashboard/edit-request",
          default: true,
          icon: <AnnouncementIcon />,
        },
        {
          text: "Delete Request",
          path: "/dashboard/delete-request",
          icon: <AnnouncementIcon />,
        },
      ],
    },
    {
      text: "Masters",
      // path: '/dashboard/add-list',
      icon: <AdminPanelSettingsIcon />,
      subItems: [
        {
          text: "Admin",
          path: "/dashboard/add-list",
          default: true,
          icon: <AdminPanelSettingsIcon />,
        },
        {
          text: "Sales Target",
          path: "/dashboard/sales-target",
          icon: <SalesTargetIcon />,
        },
        {
          text: "Minimum Stock",
          path: "/dashboard/minimum-stock",
          icon: <StockIcon />,
        },
        // { text: "Roles", path: "/dashboard/roles", icon: <RolesIcon /> },
        { text: "Club", path: "/dashboard/club", icon: <RolesIcon /> },
      ],
    },
  ];

  ///
  const MenuItem = ({
    item,
    openExpand,
    handleClick,
    handleItemClick,
    location,
  }) => (
    <React.Fragment>
      <ListItem
        disablePadding
        sx={{
          "&:hover": { backgroundColor: "transparent" },
          ...(openExpand[item.text]
            ? {
                background: "linear-gradient(90deg, #01C572 0%, #187E53 100%)",
                color: "#fff",
                borderRadius: "4px 4px 0 0",
              }
            : {}),
        }}
      >
        <ListItemButton
          onClick={() => handleClick(item.text)}
          sx={{ width: "100%", pl: 2 }}
        >
          <ListItemIcon
            sx={{
              color:
                location.pathname === item.path || openExpand[item.text]
                  ? "#fff"
                  : "inherit",
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
          {item.subItems ? (
            openExpand[item.text] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </ListItemButton>
      </ListItem>
      {item.subItems && (
        <Collapse in={openExpand[item.text]} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{
              background: "linear-gradient(90deg, #01C572 0%, #187E53 100%)",
              borderRadius: "0 0 4px 4px",
            }}
          >
            {item.subItems.map((subItem) => (
              <ListItem
                key={subItem.text}
                disablePadding
                sx={{ px: 4, py: 0.5 }}
              >
                <ListItemButton
                  selected={location.pathname === subItem.path}
                  onClick={() => handleItemClick(subItem.path)}
                  sx={{
                    height: "38px",
                    "&:hover": { backgroundColor: "rgba(1, 197, 114, 0.2)" }, // Add hover effect
                    "&.Mui-selected": {
                      background: "#fff",
                      color: "green",
                      borderRadius: "4px",
                    },
                    "&:not(.Mui-selected)": {
                      color: "#000", // Clear text color for unselected items
                      backgroundColor: "transparent", // Clear background
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        location.pathname === subItem.path ? "green" : "#000",
                    }}
                  >
                    {subItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={subItem.text}
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 500,
                      fontSize: "16px",
                      color:
                        location.pathname === subItem.path ? "green" : "#fff", // Adjust text color for selected state
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, color: "#989FA9" }}
          >
            Admin Dashboard
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Profile Picture"
              src="/static/images/avatar/1.jpg"
              onClick={handleAvatarClick}
              style={{ cursor: "pointer" }}
            />
            <Typography
              variant="body1"
              sx={{ marginLeft: 2, color: "#989FA9" }}
            >
              John Doe
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <AppLogo />
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {menuItems.map((item) => (
            <MenuItem
              key={item.text}
              item={item}
              openExpand={openExpand}
              handleClick={handleClick}
              handleItemClick={handleItemClick}
              location={location}
            />
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
///
