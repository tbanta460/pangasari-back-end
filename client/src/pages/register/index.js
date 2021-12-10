import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setRegister, registerPost } from '../../config/redux/action/setform.js';

// Assets

// Components
import { Gap, Button, Input } from '../../components/atoms';

const Register = () => {
    const navigate = useNavigate();
    const myClass = ["10 Akutansi", "11 Akutansi", "12 Akutansi", "10 Pemasaran", "11 Pemasaran", "12 Pemasaran", "10 AP", "11 AP", "12 AP"]
    const {register} = useSelector(state => {
        return {
            register: state.SetForm.register, 
        }
    });
    const [isError, setIsError] = useState({})
    const dispatch = useDispatch();
    const {userName, email, firstName,lastName,password,confirmPassword, tempatTanggalLahir, tahunAjaran, age} = register;

    const handleSubmit = (e) => {
        registerPost(register)
        .then(res => console.log(res))
        .catch(error => {
            let msgError = {}
            if(error.length >= 1){
               
                error.map(async data => {
                    for(const myObj in register)
                    if(data.param === myObj){
                        msgError[myObj] = data.msg
                    }
                })
            }
            setIsError(msgError)
        })
        clearForm()
    }
    const clearForm = () => {
        dispatch(setRegister("userName", ""));
        dispatch(setRegister("email", ""));
        dispatch(setRegister("firstName", ""));
        dispatch(setRegister("lastName", ""));
        dispatch(setRegister("age", ""));
        dispatch(setRegister("tempatTanggalLahir", ""));
        dispatch(setRegister("tahunAjaran", ""));
        dispatch(setRegister("password", ""));
        dispatch(setRegister("confirmPassword", ""));
    }
    return(
        <>
            <div>
                <div className="flex flex-row-reverse ">
                
                    <div className="w-screen bg-white">
                        <div className="p-5 sm:p-14">
                            <h3 className="text-3xl font-bold">Register</h3>
                            <span>Selamat Datang Di SMK Pangasari.</span>
                            <br/>
                            <span>Silahkan Untuk Daftar Sebagai Siswa SMK Pangasari Terlebih Dahulu Untuk Dapat Login.</span>
                        </div>
                        <div className="pb-14 bg-white shadow-lg p-5 sm:p-10 rounded-xl w-11/12 sm:w-4/5 mx-auto">
                        <span className={`p-4 w-11/12 text-white bg-red-500 font-bold mx-auto block text-center rounded-lg my-5 mb-14 ${Object.keys(isError).length !== 0 ? "block" : "hidden"}`}>Terjadi Kesalahan Saat Mendaftar</span>
                            <div>
                                <div className="flex flex-col sm:flex-row relative">
                                    <div className="relative flex flex-row">
                                        <Input type="text" ph="Username" label="Username:" id="username" htmlfor="username" value={userName} onChange={e => dispatch(setRegister("userName", e.target.value))}/>
                                        <span className={`text-red-500 text-sm block absolute -bottom-5 right-0 left-0 mx-auto ${Object.keys(isError).length !== 0 ? "block":"hidden"}`}>{isError.userName}</span>
                                    </div>
                                    <Gap WH="sm:w-10 h-10" />
                                    <div className="flex flex-row relative">
                                        <Input type="email" ph="Email" label="Email:" id="email" htmlfor="email" value={email} onChange={e => dispatch(setRegister("email", e.target.value))}/>
                                        <span className={`text-red-500 text-sm block absolute -bottom-5 right-0 w-full mx-auto ${Object.keys(isError).length !== 0 ? "block":"hidden"}`}>{isError.email}</span>
                                    </div>
                                </div>
                                <Gap WH="h-10" />
                                <div className="flex sm:flex-row flex-col">
                                    <div className="relative flex flex-row">
                                        <Input type="text" ph="First Name" label="First Name:" id="firstName" htmlfor="firstName" value={firstName} onChange={e => dispatch(setRegister("firstName", e.target.value))}/>
                                        <span className={`text-red-500 text-sm block absolute -bottom-5 right-0 left-0 mx-auto ${Object.keys(isError).length !== 0 ? "block":"hidden"}`}>{isError.firstName}</span>
                                    </div>
                                    <Gap WH="sm:w-10 h-10" />
                                    <div className="relative flex flex-row">
                                        <Input type="text" ph="Last Name" label="Last Name:" id="lastName" htmlfor="lastName" value={lastName} onChange={e => dispatch(setRegister("lastName", e.target.value))}/>
                                        <span className={`text-red-500 text-sm block absolute -bottom-5 right-0 w-full mx-auto ${Object.keys(isError).length !== 0 ? "block":"hidden"}`}>{isError.lastName}</span>
                                    </div>
                                </div>
                                <Gap WH="h-10" />
                                <div className="relative">
                                    <Input type="number" ph="Age" label="Age:" id="age" htmlfor="age" value={age} onChange={e => dispatch(setRegister("age", e.target.value))}/>
                                    <span className={`text-red-500 text-sm block absolute -bottom-5 right-0 left-0 mx-auto ${Object.keys(isError).length !== 0 ? "block":"hidden"}`}>{isError.age}</span>
                                </div>
                                <Gap WH="h-10" />
                                <div className="grid grid-cols-3 relative">
                                    {
                                        myClass.map(data => {
                                            return <Input type="radio" label={data} id={data} htmlfor={data} value={data} Stylee="w-30" isStyle="w-1/2 outline-none focus:outline-none radios-none" name="kelas" onFocus={e => dispatch(setRegister("kelas", e.target.value))} myStyle="items-center"/>
                                        })
                                    }
                                    <span className={`text-red-500 text-sm block absolute -bottom-5 right-0 left-0 mx-auto ${Object.keys(isError).length !== 0 ? "block":"hidden"}`}>{isError.kelas}</span>
                                </div>
                                <Gap WH="h-10" />
                                <div className="flex flex-col sm:flex-row relative">
                                    <div>
                                        <Input type="text" ph="Tempat Tanggal Lahir" label="Tempat Tanggal Lahir:" id="tempatTanggalLahir" htmlfor="tempatTanggalLahir" value={tempatTanggalLahir} onChange={e => dispatch(setRegister("tempatTanggalLahir", e.target.value))}/>
                                        
                                        <span className={`text-red-500 text-sm block absolute -bottom-5 right-0 left-0 mx-auto ${Object.keys(isError).length !== 0 ? "block":"hidden"}`}>{isError.tempatTanggalLahir}</span>
                                    </div>
                                    <Gap WH="sm:w-10 h-10" />
                                    <div>
                                        <Input type="text" ph="Tahun Ajaran" label="Tahun Ajaran:" id="tahunAjaran" htmlfor="tahunAjaran" value={tahunAjaran} onChange={e => dispatch(setRegister("tahunAjaran", e.target.value))}/>
                                        
                                        <span className={`text-red-500 text-sm block absolute -bottom-5 right-32 mx-auto ${Object.keys(isError).length !== 0 ? "block":"hidden"}`}>{isError.tahunAjaran}</span>
                                    </div>
                                </div>
                                <Gap WH="h-10" />
                                <div className="flex flex-col sm:flex-row relative">
                                    <Input type="password" ph="Password" label="Password:" id="password" htmlfor="password" value={password} onChange={e => dispatch(setRegister("password", e.target.value))}/>
                                    
                                    <span className={`text-red-500 text-sm block absolute -bottom-5 right-0 left-0 mx-auto ${Object.keys(isError).length !== 0 ? "block":"hidden"}`}>{isError.password}</span>
                                    
                                    <Gap WH="sm:w-10 h-10" />
                                    
                                    <Input type="password" ph="Confirm Password" label="Confirm Password:" id="confirmPassword" htmlfor="confirmPassword" value={confirmPassword} onChange={e => dispatch(setRegister("confirmPassword", e.target.value))}/>
                                    
                                    <span className={`text-red-500 text-sm block absolute -bottom-5 right-32 mx-auto ${Object.keys(isError).length !== 0 ? "block":"hidden"}`}>{isError.cofirmPassword}</span>
                                </div>
                                
                            </div>
                            <div>
                                <Gap WH="h-10" />
                                <Button type="submit" Stylee="bg-orange px-7 py-4 text-white rounded-full" title="Register" onClick={handleSubmit}/>
                                <span className="sm:mx-8 ml-4 cursor-pointer" onClick={() => navigate('/login')}>Already Have an Account?</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register