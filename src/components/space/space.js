import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";


function Space() {
  return (
    <div>
      <div class="card mt-4">
        <div class="card-body">
          <div class="d-flex flex-column mb-3">
            <div class="p-2">
              {/* <li className="nav-item active"> */}
              <Link
                to="https://devendrakumarsspace26.quora.com/"
                className="nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-user-secret" aria-hidden="true"></i>
              </Link>
              {/* </li> */}
            </div>
            <div class="p-2">Flex item 1</div>
            <div class="p-2">Flex item 2</div>
            <div class="p-2">Flex item 3</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Space;
