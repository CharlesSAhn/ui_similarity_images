import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageGrid from 'components/ImageGrid'
import ImageGridThumbnail from 'components/ImageGridThumbnail'
import Image from 'components/Image'
import Grid from '@material-ui/core/Grid';
import * as actions from 'actions';

class ImageList extends Component {

    componentDidMount(){
        if (this.props.imageList.images.length === 0) {
            this.props.fetchImageList();
        }

    }

    render (){

        return (
            <div>
                <div>
                    {
                        this.props.imageList.images.length > 0  && this.props.imageurl === null && ( <ImageGrid />)
                    }
                </div>
                <div>
                    {
                        this.props.imageList.images.length > 0  && this.props.imageurl !== null && ( 
                            <Grid container spacing={1}> 
                                <Grid item xs={12} sm={6}>
                                    <ImageGridThumbnail />
                                </Grid>     
                                <Grid item xs={12} sm={6}>
                                    <Image imageurl={this.props.imageurl}/>
                                </Grid>            
                            </Grid>
                            
                            
                        )
                    }
                </div>
                
            </div>
        
        )
    }
    
}

function mapStateToProps(state){
    return { 
        imageList: state.imageList
    }
}

export default connect(mapStateToProps, actions)(ImageList);