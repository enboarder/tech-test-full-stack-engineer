import { SHIP_API } from '../constants/api';
import { MAX_FILE_SIZE } from '../constants/fileSize';

export const handleSearch = async (queryParams) => {
  try {
    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join('&');

    const response = await fetch(`${SHIP_API}?${queryString}`);
    const data = await response.json();
    return data.ships || [];
  } catch (error) {
    alert('failed to fetch ships');
    return [];
  }
};

export const handleUploadIcon = async (shipId, file) => {
  try {
    if (file.size <= MAX_FILE_SIZE) {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${SHIP_API}/upload/${shipId}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File upload success');
      } else {
        alert('Error uploading icon');
      }
    } else {
      alert('Please select a file that is 100KB or smaller.');
    }
  } catch (error) {
    console.error('Error uploading icon:', error);
  }
};
