import { AddSharp } from '@material-ui/icons'
import React, { useState } from 'react'
import food from './images/food.png'
import books from './images/books.png'
import travel from './images/travel.png'
import movies from './images/movies.png'
import music from './images/music.png'
import science from './images/science.png'
import technology from './images/technology.png'
import '../../sidebar/sidebarOptions/SidebarOptions.css'
import { Modal } from "react-responsive-modal";
import CreateSpace from '../../space/CreateSpace/CreateSpace'

function SidebarOptions() {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

 
  return (
    <div className="sidebarOption_main card">
      <div className="sidebarOption bg-gray">
        <AddSharp className="text-danger" onClick={onOpenModal} />
        <p className="text-danger" onClick={onOpenModal}>
          create Space
        </p>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <CreateSpace />
      </Modal>
      <div className="sidebarOption">
        <img src={books} alt="" />
        <p>Books</p>
      </div>

      <div className="sidebarOption">
        <img src={food} alt="" />
        <p>Food</p>
      </div>

      <div className="sidebarOption">
        <img src={travel} alt="" />
        <p>Travel</p>
      </div>

      <div className="sidebarOption">
        <img src={movies} alt="" />
        <p>Movies</p>
      </div>

      <div className="sidebarOption">
        <img src={music} alt="" />
        <p>Music</p>
      </div>

      <div className="sidebarOption">
        <img src={science} alt="" />
        <p>Science</p>
      </div>

      <div className="sidebarOption">
        <img src={technology} alt="" />
        <p>Technology</p>
      </div>
    </div>
  );
}

export default SidebarOptions