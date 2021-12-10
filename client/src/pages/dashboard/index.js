import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom';
import Axios from 'axios'

// Assests
import { IconPayment, IconFriends, IconScore } from '../../assets/index.js'

// Components
import { SideBar, Profile, ListMenu, Main } from '../../components'
const Dashboard = () => {
    const listMenu = ["Teman Kelas", "Nilai Quizz", "Pembayaran"]
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [listMenuMobile, setListMenuMobile] = useState([])
    const [user, setUser] = useState({});
    const [change, setChange] = useState("Teman Kelas" || 0)
    const {kelas} = user

    const hasWindow = typeof window !== "undefined"
    
    useEffect(() => {
        const forAcessUser = async () => {
            const acessUser = await Cookies.get('user');
            if(acessUser !== undefined){
                await Axios.get(`http://localhost:5000/user/dashboard/${acessUser}`)
                .then(async respone => {
                    await setUser(respone.data.data)

                })
                .catch(err => {
                    return navigate('/login')
                })
            } else {
                return navigate('/login')
            }
        }
        forAcessUser();
    },[navigate]);
    useEffect(() => {
        if(windowWidth < 640){
            const listMenuMobile = [IconFriends, IconScore, IconPayment ];
            setListMenuMobile(listMenuMobile)
        } else {
            setListMenuMobile([])
        }
        
        if(hasWindow){
            const setSizeWindow = () => {
                setWindowWidth(window.innerWidth)
            }
            window.addEventListener("resize", setSizeWindow)
            return () => window.removeEventListener("resize", setSizeWindow)
        }
        
    }, [windowWidth, hasWindow]);
    const handleClick = e => {
        if(e.target.textContent !== ""){
            setChange(e.currentTarget.textContent);
        }else {
            setChange(e.target.id)
        }
    }
    return(
        <>
            <div>
                <div className="flex flex-row w-11/12 mx-auto items-center font-body">
                    <div className="profile lg:w-9/12 mx-3 w-full">
                        <Profile data={user}/>
                    </div>
                    <div className="sidebar-right mx-3 w-2/5 lg:block hidden">
                        <SideBar />
                    </div>
                </div>
                <div>
                    <div className="w-11/12 mx-auto bg-white rounded-xl font-body">
                        <ListMenu onClick={handleClick} value={change} isStyle="flex flex-row p-5 sm:static sm:bg-transparent bg-white left-0 w-full sm:justify-start justify-between fixed bottom-0" Stylee="bg-blue text-white p-2 rounded-lg " array={listMenu} arrayForMobile={listMenuMobile} sizeWindow={windowWidth}/>
                        <Main value={change} array={listMenu} arrayForMobile={listMenuMobile} kelas={kelas} dataId={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard