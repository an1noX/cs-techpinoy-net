import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-black text-orange-400">
      {/* Content sections with relative positioning */}
      <div className="relative z-10">
        <Hero />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
