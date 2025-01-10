import axiosInstance from './axiosInstance';

export const registerUser = async userData => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    localStorage.setItem('token', response.data.token);
    const userProfile = await axiosInstance.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${response.data.token}`,
      },
    });
    localStorage.setItem('role', userProfile.data.data.role.name);
    return response.data;
  } catch (error) {
    console.error('Error registering user', error);
    throw error;
  }
};

export const loginUser = async userData => {
  try {
    const response = await axiosInstance.post('/auth/login', userData);
    localStorage.setItem('token', response.data.token);
    const userProfile = await axiosInstance.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${response.data.token}`,
      },
    });
    localStorage.setItem('role', userProfile.data.data.role.name);
    return response.data;
  } catch (error) {
    console.error('Error logging in user', error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/auth/me');
    const userData = response.data.data;
    localStorage.setItem('role', userData.role.name);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile', error);
    throw error;
  }
};

export const updateUserProfile = async userData => {
  try {
    const response = await axiosInstance.put('/auth/update-details', userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile', error);
    throw error;
  }
};
