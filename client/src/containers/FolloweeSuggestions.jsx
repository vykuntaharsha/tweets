import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFolloweeSuggestions} from '../actions';
import Spinner from '../components/Spinner';
import UserBar from '../components/UserBar';

class FollowSuggestions extends Component {
    componentWillReceiveProps(nextProps){
        if(nextProps.reset){
            this.props.dispatch(getFolloweeSuggestions());
        }
    }

    componentDidMount(){
        this.props.dispatch(getFolloweeSuggestions());
    }

    render(){

        const {suggestions, isFetching, dispatch} = this.props;

        const suggestionItems = suggestions.map( (item, index) => {
            return <UserBar key={index} user={item} dispatch={dispatch}/>;
        });

        const content = () =>{
            if (isFetching){
                return <Spinner/>
            }else if (suggestions.length !== 0) {
                return suggestionItems;
            } else {
                return 'No results';
            }
        }
        return (
            <div className="row mt-2 ml-2 p-2 bg-white">
                <div className="side-label ml-2">
                    Who to follow
                </div>
                <div className="col-12">
                    {content()}
                </div>
            </div>
        );



    }

}

const mapStateToProps = (state)=>{
    const {followeeSuggestions} = state
    return {
        suggestions : followeeSuggestions.suggestions || [],
        isFetching : followeeSuggestions.isFetching,
        reset : followeeSuggestions.reset
    };
}

export default connect(mapStateToProps)(FollowSuggestions);
