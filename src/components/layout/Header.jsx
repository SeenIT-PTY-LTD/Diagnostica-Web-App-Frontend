import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const headerClasses = `bg-white text-black p-4 flex justify-between items-center`;
  const logoutButtonClasses = `bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500`;

  return (
    <header className={headerClasses}>
      <h1 className="text-xl font-bold">My App</h1>
      <div className="flex items-center space-x-4">
        <p className="text-gray-500 font-bold text-lg">
          {`${auth?.doctorInfo?.[0]?.firstName} ${auth?.doctorInfo?.[0]?.lastName}`}{" "}
        </p>

        {/* <button className={logoutButtonClasses} onClick={handleLogout}>
          Logout
        </button> */}
      </div>
    </header>
  );
};

export default Header;
