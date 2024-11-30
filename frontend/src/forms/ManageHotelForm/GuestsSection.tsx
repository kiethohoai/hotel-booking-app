import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="mb-1.5 text-2xl font-bold">Guests</h2>
      <div className="grid grid-cols-2 gap-5 bg-gray-300 p-6">
        <label className="text-sm font-semibold text-gray-700">
          Adults
          <input
            type="number"
            min={1}
            className="w-full rounded border px-3 py-1.5 font-normal"
            {...register('adultCount', { required: 'This field is required!' })}
          />
          {errors.adultCount && (
            <span className="text-sm font-bold text-red-500">
              {errors.adultCount.message}
            </span>
          )}
        </label>

        <label className="text-sm font-semibold text-gray-700">
          Children
          <input
            type="number"
            min={1}
            className="w-full rounded border px-3 py-1.5 font-normal"
            {...register('childCount', { required: 'This field is required!' })}
          />
          {errors.childCount && (
            <span className="text-sm font-bold text-red-500">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
