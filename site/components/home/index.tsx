import Banner from "./Banner";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Footer from "../Footer";

function Home() {
  return (
    <div className="home-wrapper cresc-home">
      <Banner />
      <Page1 />
      <Page2 />
      <Page3 />
      <Footer />
    </div>
  );
}

export default Home;
