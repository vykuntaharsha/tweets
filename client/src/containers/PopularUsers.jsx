import React, {Component} from 'react';
import {connect} from 'react-redux';
//import InfiniteScroll from 'react-infinite-scroller';
import Spinner from '../components/Spinner'
import {getPopularUsers} from '../actions';
import UserBar from '../components/UserBar';

class PopularUsers extends Component {

    componentWillReceiveProps(nextProps){

        if(nextProps.reset){
            this.props.dispatch(getPopularUsers());
        }
    }

    componentDidMount(){
        if(this.props.isAuthenticated){
            this.props.dispatch(getPopularUsers());
        }

    }


    render(){
        const {users, isFetching, dispatch} = this.props;

        const userItems = users.map( (item, index) => {
            return (
                <UserBar key={index} user={item} dispatch={dispatch}/>
            );
        });
        const content = () =>{
            if (isFetching){
                return <Spinner/>
            }else if (users.length !== 0) {
                return userItems;
            } else {
                return 'No results';
            }
        }
        return (
            <div className="row mt-2 ml-2 p-2 bg-white">
                <div className="side-label ml-2">
                    Popular users
                </div>
                <div className="ml-auto text-right pt-1">
                    <span className="view-more">
                        view more
                    </span>
                </div>
                <div className="col-12">
                    {content()}
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state)=>{
    const {popular, authentication} = state;

    return {
        isAuthenticated : authentication.isAuthenticated,
        users : popular.users || [],
        isFetching : popular.isFetching,
        reset : popular.reset
    };
}

export default connect(mapStateToProps)(PopularUsers);
