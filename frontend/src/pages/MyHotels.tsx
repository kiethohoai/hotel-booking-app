import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as apiClient from '../api-client';
import { useAppContext } from '../context/useAppContext';
import { BsBuilding, BsMap } from 'react-icons/bs';
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi';

const MyHotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelData } = useQuery(
    'fetchMyHotels',
    apiClient.fetchMyHotel,
    {
      onError: () => {
        showToast({
          type: 'ERROR',
          message: 'Error fetching My Hotels data',
        });
      },
    },
  );

  if (!hotelData || hotelData.length === 0) {
    return <span>No Hotels Found!</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 px-3 py-2 text-xl font-bold text-white hover:bg-blue-700"
        >
          Add Hotel
        </Link>
      </span>

      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div className="flex flex-col justify-between gap-5 rounded-lg border border-slate-300 p-8">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>

            <div className="grid grid-cols-5 gap-2">
              <div className="flex items-center justify-center gap-1 rounded-sm border border-slate-300 p-2">
                <BsMap />
                {hotel.city}, {hotel.country}
              </div>
              <div className="flex items-center justify-center gap-1 rounded-sm border border-slate-300 p-2">
                <BsBuilding />
                {hotel.type}
              </div>
              <div className="flex items-center justify-center gap-1 rounded-sm border border-slate-300 p-2">
                <BiMoney />${hotel.pricePerNight}/Night
              </div>
              <div className="flex items-center justify-center gap-1 rounded-sm border border-slate-300 p-2">
                <BiHotel />
                {`${hotel.adultCount} Adults ${hotel.adultCount} Childs`}
              </div>
              <div className="flex items-center justify-center gap-1 rounded-sm border border-slate-300 p-2">
                <BiStar />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 px-3 py-2 text-xl font-bold text-white hover:bg-blue-700"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
