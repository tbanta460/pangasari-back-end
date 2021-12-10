
import React from 'react'
import { BrowserRouter as Router} from "react-router-dom";

// Components
import { Routess } from '../config/index';
import { Header, Footer } from '../components'

function Main() {
  return (
   <>
   <div>
      <div className="header">
        <Router>
          <Header />
        </Router>
      </div>
      <div className="route bg-gray-100">
        <Routess />
      </div>
      <div className="footer hover:rouded-tr-full hover:rounded-bl-full">
        <Footer />
      </div>
    </div>
   </>
  );
}

export default Main;
