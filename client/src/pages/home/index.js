import React from 'react';
import { useNavigate } from 'react-router-dom'

// // Assets

// Image
import { ImgSchool, ImgPartThree, ImgPartTwo, ImgPartOne } from '../../assets';

// Icon
import { IconEducation, IconBook, IconGraduation, IconLesson, IconTeacher } from '../../assets'

// Components
import { Image, Button, Gap } from '../../components'



const Home = () => {
    const navigate = useNavigate
    return (
        <>
            <div>
                <div className="font-body">
                    <div className="hero-part w-full relative">
                        <Image src={ImgSchool} alt="Gambar Hero Untuk Bagian Depan" Stylee="w-full h-98"/>
                        <div className="absolute top-0 flex flex-col left-0 right-0 mx-auto flex flex-row items-center justify-center border-4 border-blue border-solid text-center w-80 lg:w-96 mt-14 p-5 rounded-lg bg-black-opacity">
                            <h2 className="text-xl font-bold text-white">Rancang Masa Depan Kamu Di Umur Sedini Mungkin</h2>
                            <Gap WH="h-24"/>
                            <Button title="Bergabung" Stylee="text-white font-bold bg-blue p-4 px-10" onClick={() => navigate('register')}/>
                        </div>
                    </div>
                    <div className="middle-part">
                        <div className="py-14 text-white bg-blue middle-part-one">
                            <div className="w-2/3 mx-auto justify-center">
                                <h3 className="font-bold text-xl text-center">Jangan Ragu Untuk Melangkah Ke Depan</h3>
                                <Gap WH="h-10" />
                                <p className="text-center">Gapai cita-cita bersama kami dengan mengembangkan skill yang kalian miliki. SMK Pangasari lebih memfokuskan apa yang dimiliki atau diminati oleh para murid, sehingga ke depannya ketika lulus setiap Murid telah memiliki tujuan jelas dengan masa depannya.</p>
                            </div>
                            <Gap WH="h-14"/>
                            <div className="flex flex-col lg:px-0 px-14 lg:flex-row justify-around relative lg:items-start items-center">
                                <div className="relative w-80 text-center text-white">
                                    <Image Stylee="rounded-lg"src={ImgPartOne} alt="Meningkatkan skill atau keahlian murid"/>
                                    <span className="p-4 block absolute bottom-0 w-full mx-auto bg-black-opacity">Mengutamakan Keahlian Murid Demi Masa Depan Murid</span>
                                </div>
                                <div className="relative w-80 text-center text-white my-5 lg:my-0">
                                    <Image Stylee="rounded-lg"src={ImgPartTwo} alt="kegiatan sekolah"/>
                                    <span className="p-4 block absolute bottom-0 w-full mx-auto bg-black-opacity">Kegiatan Sekolah Yang Meningkatkan Kreatifitas Dan Komunikasi Murid</span>
                                </div>
                                <div className="relative w-80 text-center text-white">
                                    <Image Stylee="rounded-lg"src={ImgPartThree} alt="ekskul sekolah"/>
                                    <span className="p-4 block absolute bottom-0 w-full mx-auto bg-black-opacity">Kegiatan Ekskul Guna Kelak Murid Memahami Kegiatan Yang Mereka Sukai</span>
                                </div>
                            </div>
                        </div>
                        <div className="middle-part-two bg-vintage">
                            <h3 className="text-center text-2xl md:text-4xl text-black font-bold p-14">Mengapa Memilih SMK Pangasari ?</h3>
                            <div className="bg-vintage p-14 lg:grid lg:grid-cols-02 flex flex-col-reverse">
                                <div className="part-left flex flex-col text-black text-sm">
                                    <div className="part-one flex flex-row">
                                        <Image src={IconBook} alt="icon buku" Stylee="w-56"/>
                                        <Gap WH="w-14"/>
                                        <p className="self-center p-3">Materi yang relevan dengan kurikulum yang baik, guna pembelajaran murid agar lebih tersusun dan mencapai tujuan pendidikan.</p>
                                    </div>
                                    <Gap WH="h-14"/>
                                    <div className="part-two flex flex-row">
                                        <Image src={IconEducation} alt="icon education" Stylee="w-96"/>
                                        <Gap WH="w-14"/>
                                        <p className="self-center p-5">Setiap guru diharuskan menyiapkan materi atau point-point yang penting sebelum pembelajaran dimulai, agar ketika waktu pembelajaran dimulai waktu tidak terbuang sia-sia karena kurangnya kesiapan guru dalam menyusun materi.</p>
                                    </div>
                                    <Gap WH="h-14"/>
                                    <div className="part-three flex flex-row ">
                                        <Image src={IconGraduation} alt="icon graduation" Stylee="w-96"/>
                                        <Gap WH="w-14"/>
                                        <p className="self-center p-3">Kami berharap setiap murid yang lulus dari SMK Pangasari memiliki tujuan yang tepat dan jelas, sehingga kami berusaha untuk mebimbing murid serta menyadari murid akan kesadaran diri untuk masa depannya.</p>
                                    </div>
                                </div>
                                <div className="part-right justify-self-center self-enter lg:block hidden">
                                    <Image src={IconLesson} alt="Icon lesson" Stylee="w-544"/>
                                </div>
                            </div>
                            
                        </div>
                        <div className="middle-part-three flex flex-col p-14">
                        <h3 className="text-center text-4xl text-black font-bold p-10">Apa Kata Kepala Sekolah Pangasari ?</h3>
                            <Image src={IconTeacher} alt="teacher ion" Stylee=""/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home