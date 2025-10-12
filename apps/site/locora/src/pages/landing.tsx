// comps
import TopBar from '../components/topbar'
import Seacher from '../components/seacher'
import Cloud from '../components/cloud'

// effects
import TypeWriter from '../effects/Typewriter'

// assets
import clouds from "../assets/Clouds3.png"

function LandingPage() {

    return (
        <>
            <TopBar />

            {/* Section 1 */}
            <section id="landing" className='flex relative flex-col items-center justify-center h-screen bg-transparent'>

                <div className='relative z-1 flex flex-col items-center justify-center'>
                    <h2 className='z-1 text-2xl text-bay-of-many-800 font-black'>
                        {
                            <TypeWriter>
                                <p className='animate-blink text-bay-of-many-800'>|</p>
                            </TypeWriter>
                        }
                    </h2>

                    {/* Searcher Component (bottom) */}
                    <div className='z-1'>
                        <Seacher otherProps="max-w-lg mt-20 " />
                    </div>

                </div>

                <div className='z-1'>
                    <Cloud otherProps="absolute w-32 h-32 z-0 left-0" image="" />
                </div>

                <img src={clouds} alt="Clouds" className="absolute z-0 top-45 left-0 animate-float" />

            </section>

            {/* Section 2 */}
            <section id="features-1" className='flex flex-col items-center justify-center h-screen bg-transparent'>

            </section>
        </>
    )

}

export default LandingPage