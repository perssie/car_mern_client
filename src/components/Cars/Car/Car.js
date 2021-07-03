import React from 'react';
import { Card,CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { useDispatch } from 'react-redux';
import { likeCar, deleteCar } from '../../../actions/cars';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';

const Car = ({ car, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    const openCar = (e) => {
      // dispatch(getCar(car._id, history));
      history.push(`/cars/${car._id}`);
    };

    return (
        <Card className={classes.card}>
          <ButtonBase
            component="span"
            name="test"
            className={classes.cardAction}
            onClick={openCar}
          >
            <CardMedia className={classes.media} image={car.selectedFile || 'https://user-images.png'} title={car.name} />
            <div className={classes.overlay}>
              <Typography variant="h6">{car.name}</Typography>
              <Typography variant="body2">{car.type}</Typography>
            </div>
            <div className={classes.overlay2}>
              <Button style={{ color: 'white' }} size="small" 
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(car._id)}
              }><MoreHorizIcon fontSize="default" /></Button>
            </div>
            <div className={classes.details}>
              <Typography variant="body2" color="textSecondary" component="h2">{car.description}</Typography>
            </div>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">{car.createBy}</Typography>
            </CardContent>
          </ButtonBase>
          <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" onClick={() => dispatch(likeCar(car._id))}><ThumbUpAltIcon fontSize="small" /> {car.likes} </Button>
            <Button size="small" color="primary" > Comments {car.comments.length} </Button>
            <Button size="small" color="primary" onClick={() => dispatch(deleteCar(car._id))}><DeleteIcon fontSize="small" /> </Button>
          </CardActions>
        </Card>
      );
}

export default Car;