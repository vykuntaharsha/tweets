import React, {Component} from 'react';
import TweetsList from '../components/TweetsList';
import ProfileBar from '../components/ProfileBar';
import {connect} from 'react-redux';
import {
    getTweetsOfProfile,
    getLikedTweetsOfProfile,
    getFollowees,
    getFollowers
} from '../actions';
import Footer from '../components/Footer';
import ProfileNav from '../components/ProfileNav';
import {profileActions} from '../constants';
import UsersList from '../components/UsersList';

class Profile extends Component{

    constructor(){
        super();

        this.retries = 0;
    }


    shouldComponentUpdate(nextProps){
        const {profile, dispatch, tweets, users} = nextProps;

        if((tweets.page === 0  ||  users.page === 0) && this.retries > 5){
            return false;
        }

        if(nextProps.tweets.page === 0 || users.page === 0){
            this.retries += 1;
        }

        if(tweets.hasMore){

            if(profile.display === profileActions.DISPLAY_TWEETS){
                dispatch(getTweetsOfProfile());
            }
            if(profile.display === profileActions.DISPLAY_LIKES){
                dispatch(getLikedTweetsOfProfile());
            }
        }

        if(users.hasMore){

            if(profile.display === profileActions.DISPLAY_FOLLOWING){
                dispatch(getFollowees());
            }
            if(profile.display === profileActions.DISPLAY_FOLLOWERS){
                dispatch(getFollowers());
            }
        }
        this.retries = 0;
        return true;

    }


    componentDidMount(){
        const {profile, dispatch} = this.props;
        if(profile.display === profileActions.DISPLAY_TWEETS){
            return dispatch(getTweetsOfProfile());
        }

        if(profile.display === profileActions.DISPLAY_FOLLOWERS){
            return dispatch(getFollowers());
        }

        if(profile.display === profileActions.DISPLAY_FOLLOWING){
            return dispatch(getFollowees());
        }

    }


    renderContent(){
        const {profile, dispatch, tweets, users} = this.props;

        if(profile.display === profileActions.DISPLAY_TWEETS){
            return (
                <div>
                    {(tweets.page === 1 && tweets.content.length === 0) ?

                        <div className="text-center bg-white p-5 mr-2">
                            No tweets
                        </div> :

                        <TweetsList
                            currentUser={this.props.user}
                            tweets={tweets.content}
                            loadMore={getTweetsOfProfile}
                            hasMore={this.retries >= 5 ? false: tweets.hasMore}
                            dispatch={dispatch}
                        />
                    }
                </div>
            );
        }

        if(profile.display === profileActions.DISPLAY_FOLLOWERS){
            return (
                <div>
                    { (users.page === 1 && users.content.length === 0) ?

                        <div className="text-center bg-white p-5 mr-2">
                            No followers
                        </div> :

                        <UsersList
                            users={users.content}
                            loadMore={getFollowers}
                            hasMore={this.retries >= 5 ? false: users.hasMore}
                            dispatch={dispatch}
                        />
                     }
                </div>

            );
        }

        if(profile.display === profileActions.DISPLAY_FOLLOWING){
            return (
                <div>
                    {(users.page === 1 && users.content.length === 0) ?
                        <div className="text-center bg-white p-5 mr-2">
                            No results
                        </div> :

                        <UsersList
                            users={users.content}
                            loadMore={getFollowees}
                            hasMore={this.retries >= 5 ? false: users.hasMore}
                            dispatch={dispatch}
                        />

                    }
                </div>
            );
        }

        if(profile.display === profileActions.DISPLAY_LIKES){
            return (
                <div>
                    {(tweets.page === 1 && tweets.content.length === 0) ?
                        <div className="text-center bg-white p-5 mr-2">
                            No likes
                        </div> :

                        <TweetsList
                            currentUser={this.props.user}
                            tweets={tweets.content}
                            loadMore={getLikedTweetsOfProfile}
                            hasMore={this.retries >= 5 ? false: tweets.hasMore}
                            dispatch={dispatch}
                        />
                    }
                </div>
            );
        }


    }

    render(){
        const {profile, dispatch} = this.props;

        return (
            <div className="row">
                <ProfileNav
                    user={profile.user}
                    dispatch={dispatch}
                    view={profile.display}
                />
                <section className="col-sm-4 col-3 pt-2">
                    <ProfileBar
                        user={profile.user}
                        dispatch={dispatch}
                    />
                    <Footer />
                </section>
                <main className="col-sm-8 col-9 pt-2">
                    {this.renderContent()}
                </main>

            </div>
        );
    }
}
const mapStateToProps = state => {
  const { profile, tweets , users, authentication} = state;

  return {
    user : authentication.user,
    profile,
    tweets,
    users
  }
}
export default connect(mapStateToProps)(Profile);
