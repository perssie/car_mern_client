import React, { useEffect, useState } from 'react';
import {
  Paper, Typography, CircularProgress, Divider, TextField, Button, Grid, List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  makeStyles
} from '@material-ui/core/';
import Faker from "faker";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getCar, updateCar } from '../../actions/cars';
import CarComment from './../CarComments/CarComments';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  responsive : {
    width: '100%',
    height: 'auto',
  }
}));


const Car = () => {
  const { car, cars, isLoading } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(getCar(id));
  }, [id]);

  if (!car) return null;

  const addComment = (commentData) => {
    let currentComments = car.comments;
    dispatch(updateCar(id, { ...car, comments: [...currentComments, { author: user?.result.name, comment: commentData }] }));
    dispatch(getCar(id));
  }

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (

    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item sm={12} md={8} >
          <Paper style={{ padding: '20px' }} >
            <div className={classes.card}>

              <div className={classes.imageSection} >
                <img className={classes.responsive} src={car.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={car.name} />
              </div>

              <div  className={classes.section}>
                <Typography variant="h3" component="h2">{car.name}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">By {car.createBy}</Typography>
                <Typography gutterBottom variant="body1" component="p">{car.type}</Typography>
                <Typography gutterBottom variant="body1" component="p">{car.description}</Typography>
              </div>
            </div>
          </Paper>

        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="body1"><strong>Comments</strong></Typography>

            {car.comments?.map((comment) => (
              <Grid key={comment._id} item >
                <ListItem key={comment.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="avatar" src={Faker.image.avatar()} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography className={classes.fonts}>
                        {comment.author}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                        </Typography>
                        {`${comment.comment}`}
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </Grid>
            ))}
            {user?.result ? (
              <CarComment onCommentAdd={addComment}></CarComment>
            ) : ''}
          </Paper>
        </Grid>
      </Grid>
    </div>


  );
};

export default Car;
