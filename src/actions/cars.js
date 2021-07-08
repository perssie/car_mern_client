import * as api from '../api';
import { FETCH_ALL, FETCH_CAR, CREATE, UPDATE, DELETE, LIKE, LOADED, LOADING } from '../utils/actionTypes';

export const getCars = () => async (dispatch) => {
    try {
      dispatch({ type: LOADING });
      const { data } = await api.fetchCars();
      console.log('get all cars ....', data);
      dispatch({ type: FETCH_ALL, payload: { data }});

      console.log('get all cars ....', data);

      dispatch({ type: LOADED });
    } catch (error) {
        console.error(error.message);
    }
}

export const getCar = (id) => async (dispatch) => {
  try {

    const { data } = await api.fetchCar(id);

    dispatch({ type: FETCH_CAR, payload: { car: data } });
    dispatch({ type: LOADED });
  } catch (error) {
    console.log(error);
  }
};

export const createCar = ( car ) => async (dispatch) => {
    try {
        const { data } = await api.createCar(car);

        dispatch({ type: CREATE, payload: data});
    } catch (error) {
        console.error(error.message);
    }
}

export const updateCar = ( id, car ) => async (dispatch) => {
    try {
        const { data } = await api.updateCar(id, car);

        dispatch({ type: UPDATE, payload: data});
        dispatch({ type: LOADED });
    } catch (error) {
        console.error(error.message);
    }
}

export const deleteCar = (id) => async (dispatch) => {
    try {
      await api.deleteCar(id);
  
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const likeCar = (id) => async (dispatch) => {
    try {
      const { data } = await api.likeCar(id);
  
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };  