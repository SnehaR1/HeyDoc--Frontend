import React from 'react'
import NavBar from './NavBar'
import HomeMain from '../../Images/HomeMain.jpg'
function Home() {
    const backStyle = {
        backgroundImage: `url(${HomeMain})`,
        backgroundSize: 'cover',
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        BackgroundPosition: 'center',
        overflowY: 'auto',
        BackgroundAttachment: 'fixed',


    }
    return (
        <div><NavBar />
            <div style={backStyle} className='flex justify-center items-center '>
                <div>


                </div>

            </div></div>
    )
}

export default Home