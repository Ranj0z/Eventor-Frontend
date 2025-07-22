import Footer from "../components/footer/Footer"
import BrandIdentitySection from "../components/home/brandIdentity"
import FeaturesEventSteps from "../components/home/moreFeatures"
import Navbar from "../components/nav/Navbar"

const FeaturesPage = () => {
    return (
        <div>
            <Navbar />
            <FeaturesEventSteps />     
            <BrandIdentitySection />
            <Footer />

        </div>
    )
}

export default FeaturesPage