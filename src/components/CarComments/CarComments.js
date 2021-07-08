import { TextField, Button} from '@material-ui/core';
import React, { useState } from 'react';

const CarComments = ({ onCommentAdd }) => {

    const [commentData, setCommentData] = useState('');
    const [showSubmit, setShowSubmit] = useState(false);

    const clear = () => {
        setCommentData('');
        setShowSubmit(false)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onCommentAdd(commentData);
        clear();
    };

    return (
        <div>
            <br></br>
            <form onSubmit={handleSubmit}>
                <TextField name="description" variant="outlined" label="Description"
                    fullWidth multiline rows={4} value={commentData}
                    onChange={(e) => { setCommentData(e.target.value); (e.target.value) ? setShowSubmit(true) : setShowSubmit(false); }}
                />
                <br></br>
                <br></br>
                {showSubmit ? <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Add comment</Button> : ''}
            </form>
        </div>
    );
}

export default CarComments;