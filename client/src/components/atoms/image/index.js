import React from 'react';

const Image = ({src, isStyle,Stylee,...rest }) => {
   
    
    return (
        <>
            <div className={isStyle} >
                <img src={src} {...rest} className={`unupload bg-no-repeat bg-center bg-cover ${Stylee}`} />
            </div>
            
        </>
    )
}

export default Image