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
      <Header/>
      <div>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              {/* <Space /> */}
              <Sidebar />
            </div>
            <div className="col">
              <Content />
            </div>
            <div className="col">
              {/* <Advertisement /> */}
              <Widget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quora