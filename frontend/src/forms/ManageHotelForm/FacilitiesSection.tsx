import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';
import { hotelFacilities } from '../../config/hotel-option-config';

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="mb-1.5 text-2xl font-bold">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((fa, i) => (
          <label
            className="flex gap-1 text-sm text-gray-700"
            key={`${i}-${fa}`}
          >
            <input
              type="checkbox"
              value={fa}
              {...register('facilities', {
                validate: (facilities) => {
                  if (facilities.length > 0) return true;
                  else return 'At learn on facility is required';
                },
              })}
            />
            <span>{fa}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-sm font-bold text-red-500">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
