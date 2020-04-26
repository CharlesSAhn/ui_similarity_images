import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageGrid from 'components/ImageGrid'
import * as actions from 'actions';

class ImageList extends Component {

    componentDidMount(){

        console.log(this.props.imageList)
        if (this.props.imageList.images.length === 0) {
            this.props.fetchImageList();
        }

    }

    render (){
        return (
            <div>
                {
                    this.props.imageList.images.length > 0  && ( <ImageGrid />)
                }
            </div>
        
        )
    }
    
}

function mapStateToProps(state){
    return { 
        type: state.type,
        searchField: state.searchField,
        imageList: state.imageList
    }
}

export default connect(mapStateToProps, actions)(ImageList);