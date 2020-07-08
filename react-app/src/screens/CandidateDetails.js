// import React, {useContext} from 'react';
// import {Context} from '../store/Store'

// export const CandidateDetails = (props) => {
//     const [state, dispatch] = useContext(Context)
    
//   return (
//     <>
//       <h1>{state.candidateDetails.first_name}</h1>
//     </>
//   );
// };


import React, {useContext, useEffect, useState} from 'react';
import {Context} from '../store/Store'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
});

export const CandidateDetails = (props) => {
  /* eslint no-unused-vars: 0 */
  const [state, dispatch] = useContext(Context)
  const [candidate, setCandidate] = useState()
  const classes = useStyles();
  useEffect(() => {
    const {candidateDetails} = state
    setCandidate(candidateDetails)
  }, [state])


  return (
  <Card className={classes.root}>
    {candidate && <CardActionArea>
        <CardMedia
          className={classes.media}
          image={candidate.avatar}
          title="Contemplative Reptile"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
            {`${candidate.first_name} ${candidate.last_name}`}
          </Typography>
          {
              Object.keys(candidate).map((key) => {
              if (!['id', 'avatar', 'first_name', 'last_name'].includes(key)) {
                return <Typography gutterBottom variant="body2" component="p">
                  {candidate[key]}
                </Typography>
              }
              return null
            })
          }
          {/* 
          <Typography gutterBottom variant="body2" component="p">
            {candidate.job_title}
          </Typography>
          <Typography gutterBottom variant="body2" component="p">
            {candidate.email}
          </Typography>
          <Typography gutterBottom variant="body2" component="p">
            {candidate.gender}
          </Typography>
          <Typography variant="body2" component="p">
           {candidate.job_description}
          </Typography> */}
        </CardContent>
      </CardActionArea>}
    </Card>
  );
}