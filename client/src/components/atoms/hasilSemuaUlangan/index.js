import React from 'react';

// Components 
import { Nilai } from '..';

const NilaiUlangan = ({ForStyle, data}) => {
    return (
        <>
            <div className={ForStyle}>
                <div className="my-24">
                    <div className="flex flex-row items-center mx-auto w-11/12 justify-around">
                        <Nilai ulangan="Nilai Quizz" nilai={data.point} Style="text-xl sm:text-left text-center sm:text-4xl justify-self-center" isStyle="text-lg sm:text-3xl self-center justify-self-center"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NilaiUlangan