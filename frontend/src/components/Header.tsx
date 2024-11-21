import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl font-bold tracking-tight text-white">
          <Link to="/">HotelBookings.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to="/login"
            className="flex items-center rounded-sm bg-white px-3 font-bold text-blue-700 shadow-sm hover:bg-gray-100 hover:text-blue-800"
          >
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
