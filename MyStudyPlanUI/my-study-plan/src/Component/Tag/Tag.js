import React from 'react';
import './Tag.css';

function Tag(props){
    let colour = props.TextColor;

    return (
        <div className='tag' style={{color: colour}}>{props.TagText}</div>
    )
}

export default Tag;