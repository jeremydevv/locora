import React from 'react'
import TopBar from '../components/topbar'
import Seacher from '../components/seacher'

import TypeWriter from '../effects/Typewriter'

import clouds from "../assets/Clouds3.png"

function LandingPage() {

    return (
        <>
            <TopBar />

            {/* Section 1 */}
            <section id="landing" className='flex flex-col items-center justify-center h-screen bg-gray-100'>

                <h2 className='z-1 text-2xl text-bay-of-many-800 font-black'>{
                    <TypeWriter />
                }</h2>

                {/* Searcher Component (Left Side) */}
                <div className='z-1'>
                    <Seacher otherProps="max-w-lg mt-20 " />
                </div>

                {/* Company bubble cloud (Right Side) */}
                <div className='z-1'>

                </div>

                <img src={clouds} alt="Clouds" className="absolute z-0 bottom-0 w-full animate-float" />

            </section>

            {/* Section 2 */}
            <section id="features-1" className='flex flex-col items-center justify-center h-screen bg-gray-100'>


            </section>
        </>
    )

}

export default LandingPage