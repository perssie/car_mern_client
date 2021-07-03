import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Car from './Car/Car';
import useStyles from './styles';

const Cars = ({ setCurrentId }) => {
    const  { cars , isLoading }  = useSelector((state) => state.cars);
    //const classes = useStyles();
    console.log('length car ', cars)
    if (!cars.length && !isLoading) return 'empty';

    return (
        isLoading ? <CircularProgress></CircularProgress> : (
            <Grid container alignItems="stretch" spacing={3}>
                    {cars.map((car)=> (
                        <Grid key={car._id} item xs={12} sm={6} md={4}>
                            <Car car={car} setCurrentId={setCurrentId}></Car>
                        </Grid>
                    ))}
            </Grid>
        )
    )
}

export default Cars;