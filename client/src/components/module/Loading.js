import React from 'react'

export default function Loading(props) {
    
    const size = props.size ? props.size : 55;

    console.log(props.size);
    console.log(size)
    
    return (
        <div className='loadingContent' style={{fontSize:size}}>
            <i class="fas fa-spinner fa-spin"></i>
        </div>
    )
}
