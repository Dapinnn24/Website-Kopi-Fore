import SequenceScroll from "@/components/SequenceScroll";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/About"), { ssr: true });
const BentoGrid = dynamic(() => import("@/components/BentoGrid"), { ssr: true });
const Stats = dynamic(() => import("@/components/Stats"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const CTA = dynamic(() => import("@/components/CTA"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  return (
    <main>
      <SequenceScroll />

      {/* 
        This wrapper has a negative margin top equal to the sticky canvas height (100vh)
        so it smoothly covers the hero section when scrolled past the scrollytelling.
      */}
      <div className="-mt-[100vh] relative z-10" style={{ background: "var(--bg-primary)" }}>
        <About />
        <BentoGrid />
        <Stats />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
