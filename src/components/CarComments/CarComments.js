import { TextField, Button, Typography, Paper } from '@material-ui/core';

const CarComments = () =>  {

return (
    <div>
        <br></br>
        <form>
        <TextField name="description" variant="outlined" label="Description" 
            fullWidth multiline rows={4} 
        />  
        <br></br>
        <br></br>
        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>      
        </form>
    </div>
    );
}

export default CarComments;