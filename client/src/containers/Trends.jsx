import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTrends} from '../actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {formatNumber} from '../util';

class Trends extends Component {

    componentWillReceiveProps(nextProps){
        this.props = nextProps;
    }

    componentDidMount(){
        this.props.dispatch(getTrends());
    }

    renderHastags(hashtags){
        return hashtags.map( (item, index) => {
            return (
                <div className="col-12 mt-2 trends-hashtag" key={index}>
                    <a href="">
                        #{item.hashtag}
                    </a>
                    <span>{formatNumber(item.noOfTweets)}Tweets</span>
                </div>
            );
        });
    }

    renderSpin(){
        return (
            <div style={{color: '#3aa1f2'}}>
                <FontAwesomeIcon icon={['fas', 'spinner']} spin/>
            </div>
        );
    }

    render(){
        const {hashtags, isFetching} = this.props;

        return (
            <div className="row mt-2 ml-2 p-2 bg-white">
                <p className="trends-label ml-2">
                    Trends for you
                </p>
                {isFetching ? this.renderSpin() : this.renderHastags(hashtags)}
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
