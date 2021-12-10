import React from 'react';

// Components
import { Gap } from '..';

const Nilai = ({nilai, ulangan, Style, isStyle}) => {
    return (
        <>
            <div className="grid">
                <span className={`${Style} font-semibold`}>{ulangan}</span>
                <Gap WH="h-8" />
                <span className={`${isStyle} justify-self-center font-semibold`}>{nilai}</span>
            </div>
        </>
    )
}

export default Nilai