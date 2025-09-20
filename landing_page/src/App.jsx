import { Home } from "./pages/Home";
import Logistics from "./components/Logistics";
import CTASection from "./components/CTASection";
import Services from "./components/Services";
import Footer from "./components/Footer";
import Integrations from "./components/Integrations";
import Testimonials from "./components/Testimonials";
import LetsTalk from "./components/LetsTalk";
import "./App.css";


function App() {
  return (
    <div className="">
      {/* <Home /> */}
      <Logistics />
      <CTASection />
      <Services />
      <Integrations />
      <Testimonials />
      <LetsTalk />
      <Footer />

    </div>
  );
}

export default App;
