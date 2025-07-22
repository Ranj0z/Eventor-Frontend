// import About from "../components/about/About"
import Footer from "../components/footer/Footer"
import FlexibilitySection from "../components/home/AllFlexibility"
import EventFeaturesSection from "../components/home/EventFeatures"
import EventSteps from "../components/home/EventStep"
import Navbar from "../components/nav/Navbar"


const AboutPage = () => {
  return (
    <div>
      <Navbar />
        <FlexibilitySection />
        {/* <EventFeaturesSection /> */}
        <EventSteps />
      <Footer />
    </div>
  )
}

export default AboutPage