import { HotelType } from './../../backend/src/shared/type';
import { RegisterFormData } from './pages/Register';
import { SignInFormData } from './pages/SignIn';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const register = async (formData: RegisterFormData) => {
  const respone = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const responeBody = await respone.json();
  if (!respone.ok) {
    throw new Error(responeBody.message);
  }
  return responeBody;
};

export const signin = async (formData: SignInFormData) => {
  const respone = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const responeBody = await respone.json();
  if (!respone.ok) throw new Error(responeBody.message);
  return responeBody;
};

export const validateToken = async () => {
  const respone = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: 'include',
  });

  if (!respone.ok) {
    throw new Error(`Token invalid`);
  }

  const data = await respone.json();
  return data;
};

export const signOut = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error(`Error during sign out.`);
  const data = await res.json();
  return data;
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const respone = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: 'POST',
    credentials: 'include',
    body: hotelFormData,
  });

  if (!respone.ok) throw new Error(`Failed to add hotel`);
  return await respone.json();
};

export const fetchMyHotel = async (): Promise<HotelType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error(`Error fetching hotel`);

  const resBody = await res.json();
  return resBody;
};
