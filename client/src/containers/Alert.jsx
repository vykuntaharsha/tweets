import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import {connect} from 'react-redux';
import {resetSharePopup} from '../actions';

class Alert extends Component {

    componentWillReceiveProps(nextProps){
        this.props = nextProps;
    }

    render(){
        const {share, dispatch} = this.props;
        let content = '';

        if(share.url){
            content = (
                <Popup
                    open={true}
                    onClose={()=> {dispatch(resetSharePopup())}}
                    closeOnDocumentClick
                    >
                    <div className="py-2 text-center bg-primary text-white">
                        Shared on Twitter!
                    </div>
                    <div className=" text-center p-3">
                        <a href={share.url} target="_blank">
                            {share.url}
                        </a>
                    </div>
                </Popup>
            );
        }

        return <div>{content}</div>;
    }
}

const mapStateToProps = (state) =>{
    const {share} = state;
    return {share};
}

export default connect(mapStateToProps)(Alert);
