import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import AppLogo from '../../assets/logo/AppLogo';
import './AdminDashboard.scss';
import HomeIcon from '@mui/icons-material/Home';
import ProductIcon from '@mui/icons-material/Store';
import MembersIcon from '@mui/icons-material/Group';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ReportIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SalesTargetIcon from '@mui/icons-material/TrendingUp';
import StockIcon from '@mui/icons-material/Inventory';
import RolesIcon from '@mui/icons-material/AssignmentInd';
import { Avatar } from '@mui/material';


// Drawer width
// const drawerWidth = 240;
const drawerWidth = 300;

// Mixin for opened Drawer
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#F1F3FF',
});

// Mixin for closed Drawer
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#F1F3FF',
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Styled DrawerHeader
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// Styled AppBar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#F1F3FF',
  boxShadow: 'none',
  padding: '0 16px',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Styled Drawer
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// Main AdminDashboard component
export default function AdminDashboard() {
  const theme = useTheme();
  const matches = useMediaQuery('(min-width:600px)');
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
    const defaultExpand = menuItems.find(item => item.subItems && item.subItems.some(subItem => subItem.path === path));
    if (defaultExpand) {
      setOpenExpand(prev => ({
        ...prev,
        [defaultExpand.text]: true,
      }));
    }
  }, [location.pathname]);

  const handleDrawerOpen = () => {
    setOpen(true);
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
    const selectedItem = menuItems.find(item => item.text === text);
    if (selectedItem && selectedItem.subItems) {
      const defaultSubItem = selectedItem.subItems.find(sub => sub.default);
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

  const menuItems = [
    {
      text: 'HomePage',
      path: '/dashboard',
      icon: <HomeIcon />,
    },
    {
      text: 'Products',
      path: '/dashboard/products',
      icon: <ProductIcon />,
    },
    {
      text: 'Members',
      path: '/dashboard/members',
      icon: <MembersIcon />,
    },
    {
      text: 'Announcement',
      path: '/dashboard/announcement',
      icon: <AnnouncementIcon />,
    },
    {
      text: 'Report',
      path: '/dashboard/report',
      icon: <ReportIcon />,
    },
    {
      text: 'Masters',
      path: '/dashboard/add-list',
      icon: <AdminPanelSettingsIcon />,
      subItems: [
        { text: 'Admin', path: '/dashboard/add-list', default: true, icon: <AdminPanelSettingsIcon /> },
        { text: 'Sales Target', path: '/dashboard/sales-target', icon: <SalesTargetIcon /> },
        { text: 'Minimum Stock', path: '/dashboard/minimum-stock', icon: <StockIcon /> },
        { text: 'Roles', path: '/dashboard/roles', icon: <RolesIcon /> },
        { text: 'Club', path: '/dashboard/club', icon: <RolesIcon /> },
      ],
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography  variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: '#989FA9' }}>
          Admin Dashboard
        </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
          <Typography variant="body1" sx={{ marginLeft: 2,color: '#989FA9' }}>
            John Doe
          </Typography>
        </div>

        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%'
            }}>
            <AppLogo />
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding onClick={() => handleClick(item.text)}
                selected={location.pathname === item.path}
                sx={{
                  '&:hover': { backgroundColor: 'transparent' },
                  '&.Mui-selected': {
                    background: 'linear-gradient(90deg, #01C572 0%, #187E53 100%)',
                    color: '#fff',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  },
                }}>
                <ListItemButton
                  sx={{

                    width: '100%'

                  }}
                >
                  <ListItemIcon sx={{ color: location.pathname === item.path ? '#fff' : 'inherit' }}>
                    {item.icon} {/* Render the icon dynamically */}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                  {item.subItems ? (openExpand[item.text] ? <ExpandLess /> : <ExpandMore />) : null}
                </ListItemButton>
                {item.subItems && (
                  <Collapse in={openExpand[item.text]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItem key={subItem.text} disablePadding sx={{ pl: 2, pr: 2 }}>
                          <ListItemButton
                            selected={location.pathname === subItem.path}
                            onClick={() => handleItemClick(subItem.path)}
                            sx={{
                              '&:hover': { backgroundColor: 'transparent' },
                              '&.Mui-selected': {
                                background: '#fff',
                                color: 'green',
                                borderRadius: '4px',
                              },
                              '&.Mui-selected .MuiListItemIcon-root': {
                                color: 'green',
                              },
                              '&:not(.Mui-selected)': {
                                color: '#fff',
                                backgroundColor: 'transparent',
                              },
                            }}
                          >
                            <ListItemIcon sx={{ color: location.pathname === subItem.path ? 'green' : '#fff' }}>
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={subItem.text} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}

              </ListItem>

              {/* <Divider /> */}
            </React.Fragment>
          ))}

        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
///