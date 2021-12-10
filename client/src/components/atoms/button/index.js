import React from 'react';

const Button = ({title, type = "button", Stylee, ...rest}) => {
    return (
        <>
            <button type={type} className={`rounded-lg p-2 ${Stylee}`} {...rest}>{title}</button>
        </>
    )
}

export default Button