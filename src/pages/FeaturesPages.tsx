import Footer from "../components/footer/Footer"
import BrandIdentitySection from "../components/home/brandIdentity"
import FeaturesEventSteps from "../components/home/moreFeatures"
import HeroTry1 from "../components/home/try"
import Navbar from "../components/nav/Navbar"

const FeaturesPage = () => {
    return (
        <div>
            <Navbar />
            <FeaturesEventSteps />     
            <BrandIdentitySection />
            <HeroTry1 />
            <Footer />

        </div>
    )
}

export default FeaturesPage