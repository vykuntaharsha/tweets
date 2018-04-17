import React from 'react';
import {connect} from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';


const Nav = ({isAuthenticated, user}) => {

    let input;
    if(!isAuthenticated) return '';

    return (
        <div className="row bg-white nav-container">
            <nav className="navbar navbar-expand-lg sticky-top navbar-light m-auto col-lg-9 col-12">
                <a className="navbar-brand ml-1" style={{color:"#1da1f2"}}>
                    <FontAwesomeIcon icon={['fab','twitter']} size="lg"/>
                </a>
                <button className="navbar-toggler mr-1" type="button"
                    data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse"
                    id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <a className="nav-link">
                                <FontAwesomeIcon icon={['fas', 'home']} size="lg"/>
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">
                                <FontAwesomeIcon icon={['far', 'bell']} size="lg"/>
                                 Notifications
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">
                                <FontAwesomeIcon icon={['far', 'envelope']} size="lg"/>
                                Messages
                            </a>
                        </li>
                    </ul>
                    <form className="form-inline mr-lg-2 mt-2 mt-lg-0">
                        <div className="input-group ">
                            <input className="form-control"
                                ref={node => input = node}
                                placeholder = "Search"
                            />
                            <div className="input-group-append">
                                <span className="input-group-text" >
                                    <FontAwesomeIcon icon={['fas', 'search']}/>
                                </span>
                            </div>
                        </div>
                    </form>
                    <div className="mr-2 mt-2 mt-lg-0 ">
                        <img className="rounded-circle navbar-profile-img" src={user.profilePicture} alt="profile"
                        style={{width : 40 + 'px'}} />
                    </div>
                    <button className="btn btn-primary mt-2 mt-lg-0">Tweet</button>
                </div>
            </nav>
        </div>
    );
};

export default connect(
    (state)=>{
        return {
            isAuthenticated : state.authentication.isAuthenticated,
            user : state.authentication.user
        };
    }
)(Nav);
