import React from 'react';

// Assets

// Components
import { ListMenu } from '../../atoms';

const SideBar = () => {
    
    const pelajaran = [
        "Matematika", "Akutansi", "Ips", "Ipa", "B.Inggris", "B.Indonesia", "Agama", "Seni Budaya", "Wirausaha", "Tik", "Olahraga"
    ]
    
    return(
        <>
            <div >
                <div className="my-12 rounded-xl bg-white w-full p-3">
                    <span className="font-bold">List Pelajaran</span>
                    <div>
                        <ListMenu isStyle="grid grid-cols-2" array={pelajaran} />
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar