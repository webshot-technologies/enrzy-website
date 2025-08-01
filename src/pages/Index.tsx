'use client'
import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WorkflowTimeline from "@/components/WorkflowTimeline";
import IndustriesSection from "@/components/IndustriesSection";
import CounterSection from "@/components/CounterSection";
import WhyEnrzySection from "@/components/WhyEnrzySection";
import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import FeaturesSection from "@/components/FeaturesSection";
import EnrzyAboutSection from "@/components/EnrzyAboutSection";
import WorkFlowComponent from "@/components/WorkFlowComponent";
import Footer from "@/components/Footer";
import VideoScrollScaler from "@/components/VideoScrollScaler";
import VideoSection from '@/components/VideoSection';
import HeroBanner from '@/components/HeroBanner';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);


const Index = () => {


  return (
    <>
      <Header/>
     {/* <HeroBanner/> */}
      <VideoSection/>
     
     <HeroSection/>
      {/* <HeroSection  /> */}
   {/* <VideoScrollScaler/> */}
      <FeaturesSection />
     
      {/* <AboutSection/> */}
       <EnrzyAboutSection />
       
      <CounterSection />
      <WhyEnrzySection />
      <IndustriesSection />
      <WorkFlowComponent />
      <Footer />
    </>
  );
};

export default Index;
