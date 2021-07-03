import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider, TextField, Button, Grid  } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import { getCar, updateCar } from '../../actions/cars';
import useStyles from './styles';
import CarComment from './../CarComments/CarComments';


const Car = () => {
  const { car, cars, isLoading } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(getCar(id));
  }, [id]);

  if (!car) return null;

  
  //const [commentData, setCommentData] = useState({ creator : '', comment: ''});
  
  const clear = () => {
    //setCommentData({ creator : '', comment: ''});
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (id === 0) {
      dispatch(updateCar(id, {...car, name: user?.result?.name }));
      clear();
    }
    
  };
  
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} >
      <div className={classes.card}>

        <div className={classes.imageSection} >
          <img xs={12} sm={6} md={3} className={classes.media} src={car.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={car.name} />
        </div>

        <div xs={12} sm={6} md={3} className={classes.section}>
          <Typography variant="h3" component="h2">{car.name}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">By {car.createBy}</Typography>
          <Typography gutterBottom variant="body1" component="p">{car.type}</Typography>
          <Typography gutterBottom variant="body1" component="p">{car.description}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments</strong></Typography>

          {car.comments?.map((comment)=> (
                        <Grid key={comment.creator} item xs={12} sm={6} md={4}>
                            <Typography gutterBottom variant="body1" component="p">{comment.comment}</Typography>
                        </Grid>
                    ))}
          {user?.result ? (
              <CarComment></CarComment>
          ) : ''}          
        </div>
        
        
      </div>
    </Paper>
  );
};

export default Car;
