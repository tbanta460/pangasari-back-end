import React, { useEffect, useState } from 'react';
import { getUserById } from '../../../config/redux/action/setform.js';
import Cookies from 'js-cookie';

import { Button, Image } from '../../index.js';
// https://www.youtube.com/watch?v=T5xChgPeS6Y
const Header = () => {
    const [button,setButton] = useState("Login");
    const [user,setUser] = useState({});
    const [checkUser, setCheckUser] = useState(undefined)
    
    useEffect(() => {
        const chekCookie = async () =>{
            const getCookie = await Cookies.get('user');
            await setCheckUser(getCookie)
        }
        if(checkUser !== undefined){
            const fetchDataById = async () => {
                const getUser = await getUserById("user/dashboard", checkUser);
                setButton("Logout");
                if(getUser !== undefined && getUser !== "User tidak ditemukan"){
                    setUser(getUser.data.data);
                }
            }
            
            fetchDataById()
        }
        chekCookie()
        
    }, [ checkUser])
    
    const handleButton = async (e) => {
        if(e.target.textContent === "Login"){
            window.location.assign('/login');
            
        } else if(e.target.textContent === "Logout"){
            await Cookies.remove('user', {path:"/"});
            await Cookies.remove('refreshToken', {path:"/"});
            await window.location.assign('/login');
            setButton("Login");
        }
    }
    return(
        <>
            <div>   
                <div className="grid grid-cols-2 bg-navy items-center p-5">
                    <div>
                        <span className="self-center text-white font-bold cursor-pointer" onClick={() => window.location.assign('http://localhost:3000/')}>LOGO</span>
                    </div>
                    <div className="flex flex-row justify-items-end items-center justify-end">
                        {
                            <Button Stylee="bg-orange text-white font-bold py-2 px-5 mr-5" onClick={handleButton} title={button} type="submit"/>
                        }
                        <span className={`text-sm text-gray-100 cursor-pointer ${Object.keys(user).length !== 0 ? "hidden" : "block"}`} onClick={() => window.location.assign('/register')}>Daftar</span>
                        <div>
                            <Image src={`http://localhost:5000/${user.image}`} alt="gambar profile user" Stylee={`w-14 h-14 rounded-full cursor-pointer ${Object.keys(user).length !== 0 && checkUser !== undefined ? "block" :"hidden"}`} onClick={() => window.location.assign(`http://localhost:3000/user/dashboard/${user.firstName +"_"+ user.lastName.split(" ").filter(e => e).join("_")}`)}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header