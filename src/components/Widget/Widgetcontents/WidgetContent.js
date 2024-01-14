import React from 'react'
import '.././Widgetcontents/WidgetContent.css'

function WidgetContent() {
  return (
    <div className=" widget_contents">
      <div className="widget_content">
        <img
          src={"https://www.ineedamobile.com/wp-content/uploads/2019/03/iphone-x-600x598.png"}
          alt="hollow" style={{ height: "80px",margin:"0px 0px 0px -20px" }}
        />
        <div className="widget_contentTitle">
          <h5>Mobile App Programmer</h5>
          <p>The best Mobile App Development Company</p>
        </div>
      </div>
    </div>
  )
}

export default WidgetContent