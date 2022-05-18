import React from 'react';
import './Tag.css';

function Tag(props){
    return (
        <div className='tag'>{props.TagText}</div>
    )
}

export default Tag;