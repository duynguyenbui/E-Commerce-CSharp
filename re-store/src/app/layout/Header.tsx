import { ShoppingCart } from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';
import SignedInMenu from './SignedInMenu';
import CategoryIcon from '@mui/icons-material/Category';
import InfoIcon from '@mui/icons-material/Info';
import ContactsIcon from '@mui/icons-material/Contacts';
import InventoryIcon from '@mui/icons-material/Inventory';

const midLinks = [
  {
    title: 'Catalog',
    path: '/catalog',
    icon: CategoryIcon,
  },
  {
    title: 'About',
    path: '/about',
    icon: InfoIcon,
  },
  {
    title: 'Contact',
    path: '/contact',
    icon: ContactsIcon,
  },
];

const rightLinks = [
  {
    title: 'Login',
    path: '/login',
  },
  {
    title: 'Register',
    path: '/register',
  },
];

const navStyles = {
  color: 'inherit',
  typography: 'h6',
  '&:hover': {
    color: 'success.light',
  },
  '&.active': {
    color: 'text.secondary',
  },
  display: 'flex',
};

export const Header = () => {
  const { user } = useAppSelector((state) => state.account);
  const { basket } = useAppSelector((state) => state.basket);
  const itemCount = basket?.items.reduce((sum, item) => {
    return (sum += item.quantity);
  }, 0);

  return (
    <AppBar position="static" sx={{ mb: 4 }} color="transparent">
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box display="flex" alignItems="center" component={Link} to="/">
          <img src="/logo.svg" />
        </Box>
        <List sx={{ display: 'flex' }}>
          {midLinks.map((link) => (
            <ListItem
              component={NavLink}
              to={link.path}
              key={link.path}
              sx={navStyles}
            >
              <link.icon sx={{ mr: 2 }} />
              {link.title.toUpperCase()}
            </ListItem>
          ))}
          {user && user.roles?.includes('Admin') && (
            <ListItem component={NavLink} to={'/inventory'} sx={navStyles}>
              <InventoryIcon sx={{ mr: 2 }} />
              INVENTORY
            </ListItem>
          )}
        </List>
        <Box display="flex" alignItems="center">
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={itemCount} color="success">
              <ShoppingCart />
            </Badge>
          </IconButton>
          {user ? (
            <SignedInMenu />
          ) : (
            <List sx={{ display: 'flex' }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
