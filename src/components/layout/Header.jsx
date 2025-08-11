import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import Account_circle from "../../assets/img/Account_circle.png";

const Header = () => {
  const { auth } = useSelector((state) => state);

  const headerClasses = `bg-white text-black p-4 flex justify-end items-center h-16`;

  return (
    <header className={headerClasses}>
      <div className="flex items-center space-x-2">
        <img
          src={Account_circle}
          alt="Account"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="text-gray-500 font-bold text-lg">
          {`${auth?.doctorInfo?.[0]?.firstName || ""} ${auth?.doctorInfo?.[0]?.lastName || ""}`}
        </p>
      </div>
    </header>
  );
};

export default Header;
