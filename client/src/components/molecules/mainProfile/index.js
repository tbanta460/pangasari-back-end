import React, { useEffect, useState,Fragment } from 'react';
import Axios from 'axios'

// Components
import { ListTeman, NilaiUlangan, Spp, Button,Gap } from '../..';

const Main = ({value, kelas ,array, dataId, arrayForMobile,...rest}) => {
    const checkIsMobile = arrayForMobile.indexOf(arrayForMobile[0]).toString() === value
    const checkIsMobileScore = arrayForMobile.indexOf(arrayForMobile[1]).toString() === value
    const checkIsMobilePayment = arrayForMobile.indexOf(arrayForMobile[2]).toString() === value
    const [user, setUser] = useState([]);
    const [count, setCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const isKelas = kelas
    useEffect( () => {
        const fetchData = async () => {
            if(isKelas !== undefined){
                if(array[0] === value || checkIsMobile){
                await Axios.get(`http://localhost:5000/user/dashboards/${kelas}?page=${count}&perPage=5`)
                    .then(async user => {
                        const totalUsers = user.data.total_users
                        const perPage = user.data.per_page
                        await setUser(user.data.data);
                        await setCurrentPage(user.data.current_page);
                        await setTotalPage(Math.ceil(totalUsers / perPage))
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            }
        }
        fetchData();
        
    },[isKelas, count])
    
    const handlePrevios = () => {
        setCount(count <= 1 ? 1 : count - 1)
    }
    const handleNext = () => {
        setCount(count >= totalPage ? totalPage : count + 1)
    }
    return(
        <>
            <div >
                <div className="grid">
                    <div>
                        {

                            user.map((data,index) => {
                                return <ListTeman listFriends={data} Stylee={value === array[0]? "block" : "hidden" }nilaiQuizz={array}data={dataId} mobileStyle={arrayForMobile.indexOf(arrayForMobile[0]).toString() === value ? "block" : "hidden"} checkMobile={arrayForMobile} key={index}/>
                            })
                        }
                    </div>
                    <div className={`${value === array[0] || checkIsMobile ? "block" : "hidden"} justify-self-center my-14 self-center flex items-center sm:pb-0 pb-20 `}>
                        <Button title="Previos" Stylee="bg-blue px-5 text-white" onClick={handlePrevios}/>
                        <Gap WH="w-8" />
                        {currentPage +" / "+ totalPage}
                        <Gap WH="w-8" />
                        <Button title="Next" Stylee="bg-blue px-5 text-white" onClick={handleNext}/>
                    </div>
                </div>
                <div>
                    <NilaiUlangan data={dataId} ForStyle={value === array[1] || checkIsMobileScore ? "block" : "hidden"}/>
                </div>
                <div>
                    <Spp Stylee={value === array[2] || checkIsMobilePayment ? "block" : "hidden"} dataUser={user}/>
                </div>
            </div>
        </>
    )
}

export default Main
