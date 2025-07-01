// External files

import images from "../../../assets/images";
import DefaultWebLayOutPage from "../../components/defautWebLayOut/DefaultWebLayOutPage";
import AboutPage from "./components/about/AboutPage";
import ContactSection from "./components/contactSection/ContactSection";
import DesignProcess from "./components/designProcess/DesignProcess";
import FeaturedProjects from "./components/featuredProjects/FeaturedProjectsPage";
import PortfolioSection from "./components/portfolioSection/PortfolioSection";
import SlidePage from "./components/slide/SlidePage";

// Internal files
//Style

const HomePage = () => {
  return (
    <DefaultWebLayOutPage>
      <div>
        <div>
          <SlidePage
            imageUrls={[images.slider, images.slider, images.slider]}
          />
        </div>

        <div>
          <AboutPage />
        </div>

        <div>
          <FeaturedProjects />
        </div>

        <div>
          <SlidePage
            imageUrls={[
              "https://xaydungduanphat.com/thumbs/1366x361x1/upload/photo/888-28250.jpg",
              "https://xaydungduanphat.com/thumbs/1366x361x1/upload/photo/giam-gia-xay-dung-nha-1-22670.webp",
              "https://xaydungduanphat.com/thumbs/1366x361x1/upload/photo/c4736bd51bfab2a4ebeb-29760.jpg",
            ]}
          />
        </div>

        <div>
          <DesignProcess />
        </div>

        <div>
          <PortfolioSection />
        </div>

        <div>
          <ContactSection />
        </div>
      </div>
    </DefaultWebLayOutPage>
  );
};

export default HomePage;
