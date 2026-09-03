import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";

import { Hero } from "@/components/sections/Hero";
import { Brands } from "@/components/sections/Brands";
import { Categories } from "@/components/sections/Categories";
import { Everyone } from "@/components/sections/Everyone";
import { ProductReveal } from "@/components/sections/ProductReveal";
import { Sportswear } from "@/components/sections/Sportswear";
import { About } from "@/components/sections/About";
import { Founder } from "@/components/sections/Founder";
import { WhyUs } from "@/components/sections/WhyUs";
import { VisitStore } from "@/components/sections/VisitStore";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Brands />
        <Categories />
        <Everyone />
        <ProductReveal />
        <Sportswear />
        <About />
        <Founder />
        <WhyUs />
        <VisitStore />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
