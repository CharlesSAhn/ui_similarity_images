import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageGrid from 'components/ImageGrid'
import Image from 'components/Image'
import Grid from '@material-ui/core/Grid';
import * as actions from 'actions';

class ImageList extends Component {

    componentDidMount(){
        if (this.props.imageList.images.length === 0) {
            this.props.fetchImageList();
        }

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

    }

    state = {
        width_dimension: 0
    }

    updateWindowDimensions = () => {
        this.setState({width_dimension: window.innerWidth})
    };

    render (){


        return (
            <div>
                <div>
                    {
                        this.props.imageList.images.length > 0  && this.props.imageurl === null && ( <ImageGrid thumbnail={false} width_dimension={this.state.width_dimension}/>)
                    }
                </div>
                <div>
                    {
                        this.props.imageList.images.length > 0  && this.props.imageurl !== null && ( 
                            <Grid container spacing={1}> 
                                <Grid item xs={12} sm={6}>
                                    <ImageGrid thumbnail={true} width_dimension={this.state.width_dimension}/>
                                </Grid>     
                                <Grid item xs={12} sm={6}>
                                    <Image imageurl={this.props.imageurl} width_dimension={this.state.width_dimension}/>
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