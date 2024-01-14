import React from 'react'
import '../Widget/Widget.css'
import WidgetContent from './Widgetcontents/WidgetContent'



function Widget() {
  return (
    <div className="widget">
      <div className="widget_header">
        <h5>Space to follow</h5>
      </div>
      <div className="widget_contents">
        <WidgetContent/>
      </div>
    </div>
  )
}

export default Widget