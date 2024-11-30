import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">Image</h2>
      <div className="flex flex-col gap-4 rounded border p-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full font-normal text-gray-700"
          {...register('imageUrls', {
            validate: (imageUrls) => {
              const totalLength = imageUrls.length;
              if (totalLength === 0) {
                return `At least one image should be added`;
              }
              if (totalLength > 6) {
                return `Total number of images cannot be more than 6 image`;
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageUrls && (
        <span className="text-sm font-bold text-red-500">
          {errors.imageUrls.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
