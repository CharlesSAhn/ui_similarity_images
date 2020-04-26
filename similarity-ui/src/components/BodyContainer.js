import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Filter from 'components/FilterOptions';
import ImageList from 'components/ImageList';


class BodyContainer extends Component {

    render(){

        return (
            <Grid container spacing={1}> 
                <Grid item xs={12} sm={12}>
                    <Filter/>  
                    <ImageList />
                </Grid>
                
            </Grid>
        )
    }
    
}

export default BodyContainer;