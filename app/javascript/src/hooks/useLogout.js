import UsersService from "../services/users.service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as logoutSlice } from "../features/authSlice";
import routes from "../constants/routes";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await UsersService.signOut();
    dispatch(logoutSlice());
    navigate(routes.root);
  };

  return logout;
};

export default useLogout;
