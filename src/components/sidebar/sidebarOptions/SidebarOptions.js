import { AddSharp } from '@material-ui/icons'
import React from 'react'
import food from './images/food.png'
import books from './images/books.png'
import travel from './images/travel.png'
import movies from './images/movies.png'
import music from './images/music.png'
import science from './images/science.png'
import technology from './images/technology.png'

import '../../sidebar/sidebarOptions/SidebarOptions.css'

function SidebarOptions() {
  return (
      <div className='sidebarOption_main card'>
          <div className='sidebarOption'>
              <AddSharp/>
              <p>create Space</p>
          </div>

          <div className='sidebarOption'>
            <img src= {books}  alt='' />
            <p>Books</p>
          </div>

          <div className='sidebarOption'>
            <img src={food} alt='' />
            <p>Food</p>
          </div>

          <div className='sidebarOption'>
            <img src={travel} alt='' />
            <p>Travel</p>
          </div>

          <div className='sidebarOption'>
            <img src={movies} alt='' />
            <p>Movies</p>
          </div>

          <div className='sidebarOption'>
            <img src={music} alt='' />
            <p>Music</p>
          </div>

          <div className='sidebarOption'>
            <img src={science} alt='' />
            <p>Science</p>
          </div>

          <div className='sidebarOption'>
            <img src={technology} alt='' />
            <p>Technology</p>
          </div>
          
      </div>


  )
}

export default SidebarOptions