import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUser } from '../../../config/redux/action/setform.js'

// Compnents
import { List, Gap } from '..';

const ListSiswa = ({firstName,lastName,name,kls,tahunAjaran,ttl,age,tf, button}) => {
    const { user } = useSelector(state => state.SetForm);
    const { fullName: fn, tempatTanggalLahir: ttlr, tahunAjaran: ta, kelas, age: isAge } = user
    const dispatch = useDispatch();
    useEffect(() => {
        const forDispatch = async () => {
            await dispatch(setUser('fullName', firstName + " " + lastName));
            await dispatch(setUser('tempatTanggalLahir', ttl));
            await dispatch(setUser('tahunAjaran', tahunAjaran));
            await dispatch(setUser('age', age));
            await dispatch(setUser('kelas', kls));
        }
        forDispatch()
    },[dispatch])
    return (
        <>
            <div>
                <ul>
                    <li>
                        <List forhtml="name" label="Name:" name={tf?fn:name} id="name" tf={tf} onChange={e => dispatch(setUser("fullName", e.target.value))}/>
                    </li>
                    <Gap WH="h-5"/>
                    <li>
                        <List forhtml="kelas" label="Kelas:" name={tf?kelas:kls} id="kelas" tf={tf} onChange={e => dispatch(setUser("kelas", e.target.value))}/>
                    </li>
                    <Gap WH="h-5"/>
                    <li>
                        <List forhtml="age" label="Umur:" name={tf?isAge:age} id="age" tf={tf} onChange={e => dispatch(setUser("age", e.target.value))}/>
                    </li>
                    <Gap WH="h-5"/>
                    <li>
                        <List forhtml="thnAjaran" label="Tahun Ajaran:" name={tf?ta:tahunAjaran} id="thnAjaran" tf={tf} onChange={e => dispatch(setUser("tahunAjaran", e.target.value))}/>
                    </li>
                    <Gap WH="h-5"/>
                    <li>
                        <List forhtml="ttl" label="Tempat Tangal Lahir:" name={tf?ttlr:ttl} id="ttl" tf={tf} onChange={e => dispatch(setUser("tempatTanggalLahir", e.target.value))}/>
                    </li>
                    
                </ul>
            </div>
        </>
    )
}
export default ListSiswa