import React from 'react';
import {connect} from 'react-redux';

const FollowSuggestions = ({isAuthenticated, suggestions}) => {
    if (!isAuthenticated) return '';

    const suggestionItems = suggestions.map( (item, index) => {
        return (
            <li key={index} className="suggestions-item">
                <div>
                    <img className="suggestions-profile-picture"
                        src={item.profilePicture} alt="profile picture"/>
                </div>
                <div>
                    <a>{item.name}</a>
                    <span>{item.verified ? <i class="fas fa-badge-check"></i> : ''}</span>
                    @<a>{item.screenName}</a>
                    <button className="btn btn-outline-primary">Follow</button>
                </div>
                <hr />
            </li>
        );
    });

    return (
        <div className="card">
            Who to follow
            <ul>
                {suggestionItems}
            </ul>
        </div>
    );
};

export default connect(
    (state) => {
            isAuthenticated : state.authentication.isAuthenticated,
            suggestions : state.suggestions
        })(FollowSuggestions);
