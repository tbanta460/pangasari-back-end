import React from 'react';

// Components
import { List, Gap } from '..';

const ListPelajaran = () => {
    const pelajaran = [
        "Matematika", "Akutansi", "Ips", "Ipa", "B.Inggris", "B.Indonesia", "Agama", "Seni Budaya", "Wirausaha", "Tik", "Olahraga"
    ]
    return (
        <>
            <div>
                <ul className="grid grid-cols-2">

                    {
                        pelajaran.map(data => {
                            return (
                                <>
                                <li>
                                <Gap WH="h-3" />
                                    <List Stylee="none" name={data} isStyle="cursor-pointer"/>
                                </li>
                                
                                </>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default ListPelajaran