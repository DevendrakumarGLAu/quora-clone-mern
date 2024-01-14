import React from 'react'
import Quorabox from '../content/postbox1/quorabox'
// import QuoraContent from '../postbox2/quoraContent';

function Content() {
  return (
    <div>
      <div className="card mt-2" style={{ width: "40rem" }}>
        <div className="card-body">
          <div className="d-flex flex-column mb-3">
            <div className="p-2">
              <Quorabox />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="card mt-4">
        <div className="card-body"> */}
      <div className="d-flex flex-column">
        <div className="p-2">
          <h1>Hello post question Answer</h1>
        </div>
        {/* </div>
        </div> */}
      </div>
    </div>
  );
}

export default Content;