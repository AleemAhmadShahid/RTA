import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { alignProperty } from '@mui/material/styles/cssUtils';

const StarRating = ({ readOnly = false, disabled = false }) => {
  const [value, setValue] = React.useState(3);//for stars

  return (
    <Box
   
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:"20%",
        '& > legend': { mt: 2 },
      }}
    >
      {readOnly ? (
        <>
          {/* <Typography component="legend">Read only</Typography> */}
          <Rating name="read-only" value={value} readOnly />
        </>
      ) : (
        <>
          {/* <Typography component="legend">Controlled</Typography> */}
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            disabled={disabled}
          />
          {/* <Typography component="legend">Disabled</Typography>
          <Rating name="disabled" value={value} disabled />
          <Typography component="legend">No rating given</Typography>
          <Rating name="no-value" value={null} /> */}
        </>
      )}
    </Box>
  );
};

export default StarRating;
