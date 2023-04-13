import React from 'react'
import homeImg from '../../images/homepage.png'

// Homepage component
const HomePage = () => {
  return (<>
    <div className='home-banner'>
        <div className='content'>
            <div>
                Powering<br /><strong>Futuristic Products </strong><br /><br />
            </div>
            <div>
                With Next-gen Engineering Blueprints<br />
                <strong>Enabling Software-driven Businesses</strong>
            </div>
        </div>
        <img src={homeImg}  alt="CG homepage banner" />
    </div>
  </>)
}

export default HomePage