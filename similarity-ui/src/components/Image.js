import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import * as actions from 'actions';
import Paper from '@material-ui/core/Paper';
import { blueGrey } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';

import SimilarImages from 'components/SimilarImages'

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: grey[50],
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: grey[200],
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

const useStyles = makeStyles((theme) => ({
    root: {
    
    },
    paper: {
        backgroundColor: grey[200],
        color: blueGrey[600]
    },
    paper2: {
        marginTop: theme.spacing(3)
    },
    margin: {
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(2)
    },
    image: {
        display: 'block',
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    topMargin: {
        marginTop: theme.spacing(1)
    },
    topMarginButtons: {
        marginTop: theme.spacing(5)
    },
    select: {
        margin: theme.spacing(1),
        width: '25ch',
      },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
      },
      titleBar: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
  }));


function Image(props){

    const image_width = props.width_dimension / 6.7;
    const image_width_thumbnail = props.width_dimension / 15;

    const url = props.imageurl.url
    const url_list = url.split("/")
    const filename = url_list.pop()
    const type = url_list.pop()
    const classes = useStyles();
    const [algorithm, setAlgorithm] = useState('cosine');
    

    const [similarImages, setSimilarImages] = useState([]);

    const closeImage = () => {
        setSimilarImages([])
        props.selectedImage(null)
    };

    const handleSelect = (event) => {
        setAlgorithm(event.target.value);
    };

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function compare(a, b){
        let comparison = 0;
        if (a.score < b.score) {
            comparison = 1;
        } else if (a.score > b.score) {
            comparison = -1;
        }
        return comparison;
    }

    const getSimilarImages = () => {
        let similar_images = []
        let i;

        for (i = 0; i < 10; i ++){
            const random_num = getRandomInt(props.imageList.images.length)
            let img_obj = props.imageList.images[random_num]
            img_obj["score"] = (random_num/props.imageList.images.length).toFixed(3)
            similar_images.push(img_obj)
        }
        setSimilarImages(similar_images.sort(compare));    
    }

    return (
        <div className={classes.root} >
            <Paper variant="outlined" className={classes.paper}>
                <Grid container spacing={1}> 
                    <Grid container item xs={12} justify="flex-end">  
                        <IconButton aria-label="close" color="secondary" onClick={closeImage}>
                            <CloseIcon />
                        </IconButton >
                    </Grid>
                    <Grid container item xs={12} className={classes.margin}> 
                        <Grid item xs={12} sm={4}>
                            <img className={classes.image} src={url} alt={props.imageurl} height={image_width} width={image_width} /> 
                        </Grid> 
                        <Grid item xs={12} sm={6}>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    File name: {filename}
                                </Typography>
                            </Grid>
                            <Grid item className={classes.topMargin}>
                                <Typography variant="subtitle1">
                                    Rock type: {type}
                                </Typography>
                            </Grid>

                                                                                
                        </Grid>      
                    </Grid>
                    <Grid container item xs={12} className={classes.margin}>  
                        <Grid item>
                            <Typography variant="overline">
                                {url}
                            </Typography>
                            
                        </Grid>  
                    </Grid>
                </Grid>
            </Paper>
            <Paper variant="outlined" className={classes.paper2}>
                <Grid container spacing={1}> 
                    <Grid container item xs={12} className={classes.margin}>  
                        <Grid item  className={classes.topMargin} >
                            <FormControl className={classes.select}>
                                <InputLabel htmlFor="demo-customized-select-native">Get Top 10 Similar Images</InputLabel>
                                <NativeSelect
                                    id="demo-customized-select-native"
                                    value={algorithm}
                                    onChange={handleSelect}
                                    input={<BootstrapInput />}
                                >
                                    <option key="cosine" value="cosine">Cosine Distance</option>
                                    <option key="knn" value="knn">KNN</option>
                                
                                </NativeSelect>
                                
                            </FormControl>                           
                        </Grid>  
                    
                        <Grid item  className={classes.topMarginButtons} >
                            <Button variant="outlined" color="primary" size="large" onClick={getSimilarImages}>
                                Enter
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} className={classes.margin}>  
                        {
                            similarImages.length > 0 && (
                                <SimilarImages similarImages={similarImages} image_width_thumbnail={image_width_thumbnail}/>
                            )
                        }
                    </Grid>
                </Grid>
            </Paper>
            
        </div>
    )
}

function mapStateToProps(state){
    return { 
        type: state.type,
        searchField: state.searchField,
        imageList: state.imageList
    }
}

export default connect(mapStateToProps, actions) (Image);