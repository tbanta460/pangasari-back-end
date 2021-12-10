import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { updateUser, setUser, getUserById } from '../../../config/redux/action/setform.js';

// Assets
import { IconUbahGambar } from '../../../assets';

// Components
import { Image, Button, Gap, ListSiswa } from '../../atoms'

const Profile = ({data}) => {
    const { user } = useSelector(state => state.SetForm);
    const { fullName } = user;
    const [update, setUpdate] = useState(false);
    const [userData, setUserData] = useState({});
    const [changeImage, setchangeImage] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = data._id
    
    useEffect(() => {
        const getDataById = async () => {
            if(id !== undefined){
                const dataUser = await getUserById("user/dashboard", id)
                await setUserData(dataUser.data.data);
                setchangeImage(false)
            }
        }
        getDataById()
        
    },[ update, id, changeImage]);
    
    console.log('loping')
    useEffect(() => {
        if(update){
            dispatch(setUser('fullName', userData.firstName + " " + userData.lastName));
            dispatch(setUser('tempatTanggalLahir', userData.tempatTanggalLahir));
            dispatch(setUser('tahunAjaran', userData.tahunAjaran));
            dispatch(setUser('age', userData.age));
            dispatch(setUser('kelas', userData.kelas));
            dispatch(setUser('point', userData.point))
        }
    },[ dispatch, userData,update]);
    
    
    
    const handleImage = async (e) => {
        const file = e.target.files[0];
        userData.image = file
        update ? dispatch(setUser("image",file)) : await updateUser(userData,"","",data._id);
        setchangeImage(true)
    }
    
    const handleUpdate = async (e) => {
        if(e.target.textContent === "Edit Profile"){
            setUpdate(true);
            
        } else if(e.target.textContent === "Simpan"){
            await breakName()
            setUpdate(false);
        }
    };
    
    const breakName = async () => {
        const stringArray = fullName.split(" ")
        const filterArray = await stringArray.map(data => data).filter(data => {
            if(data !== ''){
                return data
            }
        })
        
        if(filterArray.length === 1){
            return alert('Masukan "FirstName:Name, LastName:Name" Jika Nama Anda Tidak Ada Nama Belakang')
        } else {
            let lastName = ""
            let firstName = ""
            for(let i = 1; i < filterArray.length; i++){
                
                if(filterArray.length > 2){
                    
                    firstName = filterArray[0] 
                    lastName += filterArray[i] + " "
                } else {
                    
                    firstName = filterArray[0];
                    lastName += filterArray[i];
                }
            }
            await changeProfile(firstName, lastName, filterArray.join("_"))
        }
    }
    const changeProfile = (firstName, lastName, filterArray) => {
        updateUser(user, firstName, lastName, data._id);
        navigate(`/user/dashboard/${filterArray}`);
    }
    return (
        <>
            <div className="flex flex-row">
                <div className="w-full mx-auto py-10 flex flex-col sm:flex-row bg-white my-12 rounded-xl" >
                    <div className="w-3/5 mx-auto sm:m-0">
                        <div className=" ">
                            <Image src={`http://localhost:5000/${userData.image}`} alt="Image untuk profile mahasiswa" Stylee="w-32 h-32 rounded-full mx-auto relative" isStyle=" w-auto relative upload"/>
                        </div>
                        <div>
                            <label for="type-file" >
                                <input type="file" id="type-file" className="hidden" onChange={handleImage}/>
                                <Image src={IconUbahGambar} isStyle="w-14 mx-auto my-5" alt="Image untuk mengganti gambar " Stylee="w-10 h-10 mx-auto cursor-pointer"/>
                            </label>
                        </div>
                        <Gap WH="h-10" />
                        <div className="flex flex-row mx-auto justify-center">
                            <Button title={`${update ? "Simpan" : "Edit Profile"}`} type="submit" Stylee="bg-orange font-bold text-white" onClick={handleUpdate}/>
                            <Gap WH="w-8" /> 
                            <Button title="Quizz" type="submit" Stylee="bg-orange text-white font-bold" onClick={() => navigate(`quizz`)}/>
                        </div>
                    </div>
                    <div className="w-full sm:mt-0 mt-10">
                        <div className="w-11/12 mx-auto">
                            <ListSiswa firstName={userData.firstName} lastName={userData.lastName} name={userData.firstName + " " + userData.lastName} ttl={userData.tempatTanggalLahir} tahunAjaran={userData.tahunAjaran} kls={userData.kelas} age={userData.age} tf={update}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile