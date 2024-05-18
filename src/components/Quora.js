import React from 'react'
import Header from '../components/Header/header'
// import Space from '../components/space/space'
// import Advertisement from './Advertisement/Advertisement'
import Content from './content/content'
import '../components/css/Quora.css'
import Sidebar from './sidebar/Sidebar'
import Widget from './Widget/Widget'

function Quora() {
  return (
    // <div classNameName='quora'>
    <div>
      <div>
        <div className="m-4" >
          <div className="row ">
            <div className="col-md-2 d-none d-md-block">
              <Sidebar />
            </div>
            <div className="col-md-8 col-12">
              <Content />
            </div>
            <div className="col-md-2 d-none d-md-block">
              <Widget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quora