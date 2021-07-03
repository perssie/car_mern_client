import { FETCH_ALL, FETCH_CAR, CREATE, UPDATE, DELETE, LIKE, LOADING, LOADED } from '../utils/actionTypes';

export default (state = { isLoading: true, cars: [] }, action ) => {
    switch (action.type) {
        case FETCH_ALL:
            return {  ...state, cars: action.payload.data };
        case FETCH_CAR:
            return { ...state, car: action.payload.car };
        case CREATE:
            return { ...state, cars : [...state.cars, action.payload] };
        case UPDATE :
            return { ...state, cars: state.cars.map( (car)  => car._id === action.payload ? action.payload : car ) }; 
        case DELETE:
            return { ...state, cars: state.cars.filter((car) => car._id !== action.payload) };  
        case LIKE:
            return { ...state, cars: state.cars.map((car) => (car._id === action.payload._id ? action.payload : car)) };
        case LOADING:
            return { ...state, isLoading: true };
        case LOADED:
            return { ...state, isLoading: false };          
        default:
            return state;          
    }
}