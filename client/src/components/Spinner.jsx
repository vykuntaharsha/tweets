import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const Spinner = ()=>{
    return (
        <div style={{color: '#3aa1f2'}}>
            <FontAwesomeIcon icon={['fas', 'spinner']} spin/>
        </div>
    );
}

export default Spinner;
