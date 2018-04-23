import React from 'react';
import {connect} from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {displayHome, logout, displayProfile} from '../actions';
import {display} from '../constants';
import ReactTooltip from 'react-tooltip';

const Nav = ({isAuthenticated, user, dispatch, view}) => {

    const activeHome = view === display.HOME ? 'active' : '';

    const renderHome = ()=>{
        dispatch(displayHome());
    }

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
                            <a className={"nav-link "+activeHome} onClick={renderHome}>
                                <FontAwesomeIcon icon={['fas', 'home']} size="lg"/>
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link disabled"
                                data-tip="not implemented"
                                data-for="notifications"
                                >
                                <FontAwesomeIcon icon={['far', 'bell']} size="lg"/>
                                 Notifications
                                 <ReactTooltip
                                     id="notifications"
                                     place="bottom"
                                 />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link disabled"
                                data-tip="not implemented"
                                data-for="messages"
                                >
                                <FontAwesomeIcon icon={['far', 'envelope']} size="lg"/>
                                Messages
                                <ReactTooltip
                                    id="messages"
                                    place="bottom"
                                />
                            </a>
                        </li>
                    </ul>
                    <form className="form-inline mr-lg-2 mt-2 mt-lg-0"
                        data-tip="not implemented"
                        data-for="nav-search">
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
                        <ReactTooltip
                            id="nav-search"
                            place="bottom"
                        />
                    </form>
                    <div className="mr-2 mt-2 mt-lg-0 ">
                        <div className="dropdown">
                            <img
                                className="rounded-circle navbar-profile-img dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                src={user.profilePicture} alt="profile"
                                id="profileDropDown"
                            style={{width : 40 + 'px'}} />
                            <div className="dropdown-menu"
                                 aria-labelledby="profileDropDown"
                                 >
                                 <div
                                     className="dropdown-item"
                                     onClick={()=>{dispatch(displayProfile(user.screenName))}}
                                     >
                                     View profile
                                 </div>
                                  <div className="dropdown-divider"></div>
                                  <div
                                      className="dropdown-item"
                                      onClick={()=>{dispatch(logout())}}
                                      >
                                      Logout
                                  </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

const mapStateToProps = (state) =>{
    const {authentication, display} = state
    return {
        isAuthenticated : authentication.isAuthenticated,
        user : authentication.user,
        view : display
    };
};

export default connect(mapStateToProps)(Nav);
