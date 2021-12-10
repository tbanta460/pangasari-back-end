import React from 'react';

// Components
import { Gap } from '..';
const Spp = ({Stylee, dataUser}) => {
    const spp = ["Januari", "Februari", "Maret", "April", "Mei"," Juni", "Juli","Agustus", "September", "Oktober", "November", "Desember"];
    
    return (
        <>
            <div className={`${Stylee} mb-20`}>
                <div>
                    {
                        spp.map((data, index) => {
                            return (
                                <>
                                    <div className="grid grid-cols-3 w-10/12 mx-auto border-b-4 p-4 items-center">
                                        <span className="block">{data}</span>
                                        <span className="block ">Untuk pembayaran SPP pada bulan {data}</span>
                                        <span className="rounded-lg cursor-pointer bg-green text-white p-4 block self-end justify-self-end">Lunas</span>
                                    </div>
                                    <Gap WH="h-8" key={index}/>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Spp