import axiosInstance from './axiosInstance';

export const getStoreItems = async () => {
  try {
    const response = await axiosInstance.get('/store-items');
    return response.data;
  } catch (error) {
    console.error('Error fetching store items', error);
    throw error;
  }
};

export const createStoreItem = async storeItemData => {
  try {
    const response = await axiosInstance.post('/store-items', storeItemData);
    return response.data;
  } catch (error) {
    console.error('Error creating store item', error);
    throw error;
  }
};

export const updateStoreItem = async (itemId, storeItemData) => {
  try {
    const response = await axiosInstance.put(`/store-items/${itemId}`, storeItemData);
    return response.data;
  } catch (error) {
    console.error('Error updating store item', error);
    throw error;
  }
};

export const deleteStoreItem = async storeItemId => {
  try {
    const response = await axiosInstance.delete(`/store-items/${storeItemId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting store item', error);
    throw error;
  }
};
