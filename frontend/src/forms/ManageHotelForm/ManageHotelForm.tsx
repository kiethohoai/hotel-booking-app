import { FormProvider, useForm } from 'react-hook-form';
import DetailSection from './DetailSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;

  adultCount: number;
  childCount: number;
  pricePerNight: number;
  starRating: number;

  facilities: string[];
  imageUrls: FileList;
};

type Props = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((data: HotelFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('city', data.city);
    formData.append('country', data.country);
    formData.append('description', data.description);
    formData.append('type', data.type);

    formData.append('adultCount', data.adultCount.toString());
    formData.append('childCount', data.childCount.toString());
    formData.append('pricePerNight', data.pricePerNight.toString());
    formData.append('starRating', data.starRating.toString());

    data.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    Array.from(data.imageUrls).forEach((imageUrl) => {
      formData.append('imageUrls', imageUrl);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />

        <span className="flex justify-end">
          <button
            className="rounded-sm bg-blue-600 px-4 py-1.5 text-xl font-bold text-white hover:bg-blue-700 disabled:bg-gray-500"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
