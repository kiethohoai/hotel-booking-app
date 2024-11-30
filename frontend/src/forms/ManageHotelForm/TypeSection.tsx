import { useFormContext } from 'react-hook-form';
import { hotelTypes } from '../../config/hotel-option-config';
import { HotelFormData } from './ManageHotelForm';

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch('type');

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type, i) => (
          <label
            className={
              typeWatch === type
                ? 'cursor-pointer rounded-full bg-blue-300 px-4 py-2 text-sm font-semibold'
                : 'cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm font-semibold'
            }
            key={`${i}-${type}`}
          >
            <input
              type="radio"
              value={type}
              {...register('type', { required: 'This field is required' })}
              hidden
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-sm font-bold text-red-500">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
