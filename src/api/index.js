import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001' });


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });


export const fetchCars = () => API.get(`/cars`);
export const fetchCar = (id) => API.get(`/cars/${id}`);
export const createCar = (newCar) => API.post('/cars', newCar);
export const updateCar = (id, updatedCar) => API.patch(`/cars/${id}`, updatedCar);
export const deleteCar = (id) => API.delete(`/cars/${id}`);
export const likeCar = (id) => API.patch(`/cars/${id}/likeCar`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);