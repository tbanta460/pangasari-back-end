import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import Axios from 'axios';


// import {withHooks } from "react-router-dom"
import { useSelector, useDispatch} from 'react-redux';
import { setLogin, loginPost } from '../../config/redux/action/setform.js'
import { getUser } from '../../config/redux/action/getUser.js'

// Assets
import { ImgLogin } from '../../assets';

// Components
import { Image, Button, Input, Gap } from '../../components/atoms';

const Login = () => {
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const { login } = useSelector(state => state.SetForm);

    const {userName, password} = login;
    const dispatch = useDispatch();

    useEffect(() => {
        const checkUser = async () => {
            const userId = await Cookies.get('user');
            if(userId !== undefined ) {
                await Axios.get(`http://localhost:5000/login/${userId}`)
                .then(user => {
                    if(user){
                        const isUser = user.data.data
                        window.location.assign(`http://localhost:3000/user/dashboard/${isUser.firstName+"_"+isUser.lastName.split(" ").filter(e => e).join("_")}`)
                    }
                })
                .catch(error => console.log(error.response))
            }
        }
        checkUser()
    },[])

    const inRefresh = (refreshToken) => {
        return new Promise((resolve,reject) => {
            Axios.post('http://localhost:5000/refresh', {token: refreshToken})
            .then(respone => {
                if(respone.data.success === false){
                    resolve(false)
                } else {
                    const { accessToken } = respone.data;
                    Cookies.set('accesToken', accessToken);
                    resolve(accessToken);
                }
            })
        })
    }

    const hasAccess = async (accessToken,refreshToken) => {
        if(!refreshToken) {
            return null;
        }

        if(accessToken === undefined){
            accessToken = await inRefresh(refreshToken);
            return accessToken
        }
        return accessToken
    }

    const protec = async () => {
        let accessToken = await Cookies.get('accesToken');
        let refreshToken = await Cookies.get('refreshToken');
        accessToken = await hasAccess(accessToken, refreshToken);
        if(!accessToken){
            // Pesan gagal login di sini
        } else {
            await requestLogin(accessToken, refreshToken)
        }
    }

    const requestLogin = async (accessToken, refreshToken) => {
        return new Promise((resolve,reject) => {
            Axios.post('http://localhost:5000/user/dashboard',{userName}, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then(async respone => {
                if(respone.data.success === false){
                    if(respone.data.message === 'User not authenticated'){
                        
                        // Pesan error ketika login di sini
                        
                    }else if(respone.data.message === 'Token expired'){
                        const accessToken = await inRefresh(refreshToken);
                        return await requestLogin(accessToken, refreshToken)
                    } 
                    resolve(false);
                } else {
                    const user = respone.data.data
                    await sendObj(user)
                    await Cookies.set('user', user._id);
                    window.location.assign(`http://localhost:3000/user/dashboard/${user.firstName+"_"+user.lastName.split(" ").filter(e => e).join("_")}`)
                }
            })
        })
    }
    const sendObj = (user) => {
        for(const isObj in user){
            const keysObj = user[isObj]
            dispatch(getUser(isObj, keysObj));
        }
    }
    const handleSubmit = async () =>{
        loginPost(login)
        .then(respone => {
            if(!respone){
                protec()
            }
        })
        .catch(respone => {
            setError(respone.message)
        })
        
    }
    const handleChange = (e) => {
        if(e.target.id === "username"){
            dispatch(setLogin('userName', e.target.value));
        }else {
             dispatch(setLogin('password', e.target.value))
        }
        setError("")
    }
    
    return (
        <>
            <div>
                <div className="flex flex-row-reverse">
                    <div className="w-11/12 bg-black lg:block hidden">
                        <Image Stylee="h-screen opacity-10"src={ImgLogin} alt="Gambar latar belakang untuk login" />
                    </div>
                    <div className="w-screen bg-white pb-14">
                        <div className="sm:p-14 p-5">
                            <h3 className="text-3xl font-bold">Login</h3>
                            <span>Selamat Datang Di SMK Pangasari.</span>
                            <br/>
                            <span>Silahkan Untuk Masuk Terlebih Dahulu Untuk Mengakses Profile.</span>
                        </div>
                        <div className="bg-white shadow-lg p-5 sm:p-10 rounded-xl w-11/12 sm:w-2/3 mx-auto">
                            <div className={`bg-red-500 w-80 sm:w-96 mx-auto block p-4 text-center text-white rounded-lg my-4 mb-10W ${error !== "" ? "block" : "hidden"}`}>
                                <span className="text-red text-center">{error}</span>
                            </div>
                            <div>
                                <Input value={userName} onChange={handleChange}type="text" ph="Username" label="Username:" id="username" htmlfor="username"/>
                                <Gap WH="h-10" />
                                <Input type="password" ph="Password" label="Password:" id="password" htmlfor="password" value={password} onChange={handleChange}/>
                            </div>
                            <div>
                                <Gap WH="h-10" />
                                <Button type="submit" Stylee="bg-blue px-7 py-4 text-white rounded-full" title="Masuk" onClick={handleSubmit}/>
                                <span className="mx-8 cursor-pointer" onClick={() => navigate('/register')}>Don't have an account?</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login