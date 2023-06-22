import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import UsersService from "../../services/users.service";
import { logout as logoutSlice } from "../../features/authSlice";
import routes from "../../constants/routes";

const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = async () => {
    await UsersService.signOut();
    dispatch(logoutSlice());
    navigate(routes.root);
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircle sx={{ height: "40px", width: "40px" }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={logout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
