import React from 'react'
import { Link } from 'react-router-dom'

function Hader() {

    return(
      <div className='nav bg-dark mb-2'>
      <div className="navbar w-100">
      <p className="text-white">Test Technique ATS</p>
      <Link to={`/`}>
          <div className="logo-navbar sign "><img className='logo-navbar-img'src="/logo192.png" alt='logo'  width={"80px"} />
          
          </div>

        </Link>
      </div>
    </div>
    )
}
export default Hader