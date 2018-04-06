import React from 'react';

const Home = ({user, authenticate}) => {

    function logout() {
        // TODO:
        authenticate(false);
    }

    return (
        <div>
            {user.name}
            <button onClick={logout}> Logout </button>
        </div>
    );
};

export default Home;
