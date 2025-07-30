import Footer from "../components/footer/Footer"
import FlexibilitySection from "../components/home/AllFlexibility"
import BrandIdentitySection from "../components/home/brandIdentity"
import EventSteps from "../components/home/EventStep"
import Hero from "../components/home/Hero"
import FeaturesEventSteps from "../components/home/moreFeatures"
import HeroTry1 from "../components/home/try"
import Navbar from "../components/nav/Navbar"

const LandingPage = () => {
    return (
        <div>
            <Navbar />
            {/* <Hero /> */}
            <FlexibilitySection />
            <EventSteps />
            <HeroTry1 />     
            <Footer />

        </div>
    )
}

export default LandingPage