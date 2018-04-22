import React, {Component} from 'react';
import User from './User';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from './Spinner';

class UsersList extends Component {

    constructor(){
        super();
        this.loadMoreUsers = this.loadMoreUsers.bind(this);
    }

    loadMoreUsers(){
        this.props.dispatch(this.props.loadMore());
    }

    render(){
        if(!this.props.users) {
            return (
                <div className="row bg-white p-2 mb-2 mr-2 ml-1" style={{color: '#3aa1f2'}}>
                    <Spinner/>
                </div>
            );
        }

        const usersItems = this.props.users.map( (item, index) => {
            return (
                <User
                    key={index}
                    user={item}
                    dispatch={this.props.dispatch}
                />);
        });

        return (
            <InfiniteScroll
                className="row mx-auto"
                pageStart={0}
                loadMore={this.loadMoreUsers}
                hasMore={!!this.props.hasMore}
                loader={<div className="loader" key={0}><Spinner/></div>}
                >
                {usersItems}
            </InfiniteScroll>
        );

    }
}

export default UsersList;
