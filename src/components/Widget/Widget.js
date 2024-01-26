import React from 'react'
import '../Widget/Widget.css'
import WidgetContent from './Widgetcontents/WidgetContent'
import GetUserSpace from '../space/GetUserSpace';
// import GetAllSpaces from '../'
import GetAllSpaces from '../space/GetAllSpaces';



function Widget() {
  return (
    <>
      <div>
        <GetUserSpace />
      </div>
      
      <div className="widget position-fixed" style={{marginTop:"165px"}}>
        <div className="widget_header">
          <h5>Space to follow</h5>
          <GetAllSpaces />
          <div>
          </div>
        </div>
        <div className="widget_contents">
          <WidgetContent />
        </div>
      </div>
      
    </>
  );
}

export default Widget