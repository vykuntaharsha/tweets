import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTrends, displayHashtags} from '../actions';
import {formatNumber} from '../util';
import Spinner from '../components/Spinner';

class Trends extends Component {

    componentWillReceiveProps(nextProps){
        this.props = nextProps;
    }

    componentDidMount(){
        this.props.dispatch(getTrends());
    }

    renderHastags(hashtags){
        return hashtags.map( (item, index) => {
            const setHashtag = ()=>{
                this.props.dispatch(displayHashtags(item.hashtag));
            }
            return (
                <div className="col-12 mt-2 trends-hashtag" key={index}>
                    <span onClick={setHashtag} className="hashtag">
                        #{item.hashtag}
                    </span>
                    <span>{formatNumber(item.noOfTweets)}Tweets</span>
                </div>
            );
        });
    }

    render(){
        const {hashtags, isFetching} = this.props;

        return (
            <div className="row mt-2 ml-2 p-2 bg-white">
                <p className="side-label ml-2">
                    Trending
                </p>
                {isFetching ? <Spinner/> : this.renderHastags(hashtags)}
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    const {hashtags, isFetching} = state.trends;
    return {
        hashtags,
        isFetching
    };
}

export default connect(mapStateToProps)(Trends);
