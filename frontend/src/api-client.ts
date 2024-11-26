import { RegisterFormData } from './pages/Register';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
