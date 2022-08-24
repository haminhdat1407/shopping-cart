import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsIcon from '@mui/icons-material/Directions';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from 'features/Auth/components/Login';
import { logout } from 'features/Auth/userSlice';
import { cartItemCountSelector } from 'features/Cart/selector';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Register from '../../features/Auth/components/Register';
import './style.scss';

const MODE = {
  LOGIN: 'Login',
  REGISTER: 'register',
};
export default function Header() {
  const dispath = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);
  const cartItemsCount = useSelector(cartItemCountSelector);
  const history = useHistory();
  const isLoggedIn = !!loggedInUser.id;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispath(action);
  };

  const handleCartClick = () => {
    history.push('/cart');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="header" sx={{ ml: 4, mr: 4, height: '100%' }}>
          <Link className="header__link" to="/">
            <img
              style={{ width: '80px', paddingTop: '6px' }}
              src="https://salt.tikicdn.com/ts/upload/ae/f5/15/2228f38cf84d1b8451bb49e2c4537081.png"
              alt=""
            />
          </Link>

          {/* Search input */}
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '50%' }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Tìm sản phẩm, danh mục hay thương hiệu bạn muốn mua"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <div>
            {!isLoggedIn && (
              <Button color="inherit" onClick={handleClickOpen}>
                Login
              </Button>
            )}
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleCartClick}
            >
              <Badge badgeContent={cartItemsCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {isLoggedIn && (
              <IconButton color="inherit" onClick={handleUserClick}>
                <AccountCircleIcon />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Menu keepMounted anchorEl={anchorEl} open={openUserMenu} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <CloseIcon
          sx={{
            position: 'absolute',
            right: '30px',
            top: '10px',
            fontSize: '30px',
            cursor: 'pointer',
          }}
          onClick={handleClose}
        />

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose}></Register>
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose}></Login>
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Dont have an account. Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
