import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import { Header } from '../../components';
import { Footer } from '../../components';
import Dashboard  from '../dashboard';
import Home from '../home';

const MainApp = () => {
    return(
        <>
            <div>
                <div>
                <div>ini kepal</div>
                    <Header />
                </div>
                <div>
                    <Router>
                        <Routes>
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/' element={<Home />} />
                        </Routes>
                    </Router>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default MainApp