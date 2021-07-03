import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import { createCar, updateCar } from '../../actions/cars';

const Form = ({ currentId, setCurrentId }) => {
  const [carData, setCarData] = useState({ name: '', type: '', description: '', addBy: '', createAt: '',selectedFile: '' });
  const car = useSelector((state) => (currentId ? state.cars.cars.find((car) => car._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  
  const clear = () => {
    setCurrentId(0);
    setCarData({ name: '', type: '', description: '', addBy: '', createAt: '',selectedFile: '' });
  };

  useEffect(() => {
    if (!car?.name) clear();
    if (car) setCarData(car);
  }, [car]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createCar({ ...carData, addBy: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updateCar(currentId, { ...carData, addBy: user?.result?.name }));
      clear();
    }
  };

  
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create
        </Typography>
      </Paper>
    );
  }


  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing ` : 'Add a car'}</Typography>
        <TextField name="name" variant="outlined" label="Name" fullWidth value={carData.name} onChange={(e) => setCarData({ ...carData, name: e.target.value })} />
        <TextField name="type" variant="outlined" label="Type" fullWidth value={carData.type} onChange={(e) => setCarData({ ...carData, type: e.target.value })} />
        <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={carData.description} onChange={(e) => setCarData({ ...carData, description: e.target.value })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setCarData({ ...carData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
