import React from 'react';
import QuoraContent from '../postbox2/quoraContent';
import Header from '../Header/header';
import Sidebar from '../sidebar/Sidebar';
import Widget from '../Widget/Widget';

function PostAnswer() {
  return (
    <div>
      {/* <div className="container"> */}
        <div className="row m-4">
          <div className="col-md-2 d-none d-md-block">
            <Sidebar/>
          </div>
  
          <div className="col-md-8 col-12">
            <QuoraContent />
          </div>
    
          <div className="col-md-2 d-none d-md-block">
            <Widget/>
          </div>
        </div>
      </div>
    // </div>
  );
}

export default PostAnswer;
