import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Filter from 'components/FilterOptions';
import ImageList from 'components/ImageList';
import * as actions from 'actions';
import { connect } from 'react-redux';


class BodyContainer extends Component {

    render(){

        return (
            <Grid container spacing={1}> 
                {                    
                    <Grid item xs={12} sm={12}>
                        <Filter/>  
                        <ImageList imageurl={this.props.selectedImage}/>
                    </Grid>                  
                }                                         
            </Grid>
        )
    }
    
}

function mapStateToProps(state){
    return { 
        selectedImage: state.image.selectedImage
    }
}

export default connect(mapStateToProps)(BodyContainer);