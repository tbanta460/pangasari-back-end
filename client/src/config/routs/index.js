import React from 'react'; 
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Login, Register, Home, Dashboard, Bayaran, UlanganHarian, NotFound } from '../../pages';

const Routess = () => {
    
    return (
        <>
            <Router>
                <Routes> 
                    <Route path="/user/dashboard/:firstName_lastName/quizz" element={<UlanganHarian />} />
                    <Route path="/user/dashboard/:firstName_lastName" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/*" element={< NotFound/>} />
                </Routes>
            </Router>

        </>
    )
}

export default Routess