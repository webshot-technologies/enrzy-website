import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroBannerProps {
 className?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ className = '' }) => {
 const bannerWrapRef = useRef<HTMLDivElement>(null);
 const contentRef = useRef<HTMLDivElement>(null);
 const headingRef = useRef<HTMLHeadingElement>(null);
 const textRef = useRef<HTMLParagraphElement>(null);
 const bgImageRef = useRef<HTMLDivElement>(null);
 const videoRef = useRef<HTMLVideoElement>(null);

 useEffect(() => {
  // Remove the state and event listener, as matchMedia handles this
  // Initial setup for background and video
  gsap.set(bgImageRef.current, { opacity: 1, scale: 1, zIndex: 10 });
  gsap.set(videoRef.current, { opacity: 1, zIndex: 2 });
  
  const headingLines = gsap.utils.toArray(".hero-title-line", headingRef.current);

 // Page load animation (runs once on mount)
 const loadTl = gsap.timeline({ 
  defaults: { ease: "power3.out" },
  delay: 0.3
 });
 loadTl
  .from(contentRef.current, { y: 50, autoAlpha: 0, duration: 1.2 })
  .from(headingLines, {
   y: 20,
   autoAlpha: 0,
   duration: 0.8,
   stagger: 0.15
  }, "<0.2")
  .from(textRef.current, { y: 20, autoAlpha: 0, duration: 0.8 }, "<0.4");

 // Use matchMedia for the scroll-triggered animations
 const mm = gsap.matchMedia();

 mm.add("(min-width: 992px)", () => {
 // Desktop ScrollTrigger Animation
 const desktopScrollTl = gsap.timeline({
  scrollTrigger: {
  trigger: bannerWrapRef.current,
  start: "top top",
  end: "+=250%", // Longer duration for desktop
  scrub: 1.5,
  pin: true,
  anticipatePin: 1,
  onEnter: () => videoRef.current?.play().catch(e => console.error("Video play failed:", e)),
  onLeaveBack: () => videoRef.current?.pause()
  }
 });
 desktopScrollTl
  .to(bgImageRef.current, { scale: 20, autoAlpha: 0, zIndex: 0, duration: 0.8, ease: "power2.inOut" })
  .to([headingLines, textRef.current], { y: -100, autoAlpha: 0, stagger: 0.1, duration: 0.5 }, 0)
  .to(videoRef.current, { opacity: 1, duration: 2, ease: "sine.inOut" }, "-=0.2");
  });

  mm.add("(max-width: 991px)", () => {
 // Mobile ScrollTrigger Animation
 const mobileScrollTl = gsap.timeline({
  scrollTrigger: {
  trigger: bannerWrapRef.current,
  start: "top top",
  end: "+=150%", // Shorter duration for mobile
  scrub: 1.5,
  pin: true,
  anticipatePin: 1,
  onEnter: () => videoRef.current?.play().catch(e => console.error("Video play failed:", e)),
  onLeaveBack: () => videoRef.current?.pause()
  }
 });
 mobileScrollTl
 .to(bgImageRef.current, { scale: 20, autoAlpha: 0, zIndex: 0, duration: 0.8, ease: "power2.inOut" })
 .to([headingLines, textRef.current], { y: -100, autoAlpha: 0, stagger: 0.1, duration: 0.5 }, 0)
 .to(videoRef.current, { opacity: 1, duration: 2, ease: "sine.inOut" }, "-=0.2");
 });
    
 return () => {
  // Cleanup by reverting matchMedia
  mm.revert();
 };
 }, []);

 return (
 <div className={`relative h-screen overflow-hidden ${className}`} ref={bannerWrapRef}>
 {/* Background Image - now with conditional styling */}
 <div 
  ref={bgImageRef}
  className="absolute inset-0 z-0 bg-cover bg-center"
  style={{
   backgroundImage: `url(${window.innerWidth <= 991 ? 'https://aereo.io/wp-content/themes/Aereo/assets/img/mob-white-bg.png' : 'https://aereo.io/wp-content/themes/Aereo/assets/img/home-white-bg.svg'})`,
   opacity: 1,
   transformOrigin: '90% 65%'
  }}
 />
 
 {/* Video */}
 <div className='bg-black
 '>
  <video
   ref={videoRef}
   className="absolute inset-0 z-10 md:object-cover w-full h-full"
   loop
   muted
   playsInline
   preload="auto"
  >
   <source 
    src={window.innerWidth <= 991 ? "/assets/enrzy.mp4" : "/assets/enrzy.mp4"}
    type="video/mp4"
   />
  </video>
  </div>

  {/* Content - Left aligned with 50% width on desktop, 100% on mobile */}
  <div 
   ref={contentRef}
   className="relative z-20 h-full flex items-start banner-content-margin md:items-center pl-0 md:pl-16 lg:pl-24"
   style={{ width: window.innerWidth <= 991 ? '100%' : '50%' }}
  >
   <div className="max-w-md">
    <h1 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-6">
  <span className="hero-title-line block">Revolutionize</span>
  <span className="hero-title-line block base-color">
   Power <span className="base-color">Prospects</span>
  </span>
  <span className="hero-title-line block">
   Asset <span className="base-color">Management</span>
  </span>
  </h1>
  <p ref={textRef} className="hero-subtitle text-lg md:text-xl mb-8">
   ENRZY empowers utilities to detect faults early, automate maintenance, and visualize every asset in 3D — ensuring higher uptime, lower risk, and smarter decisions.
  </p>
   </div>
  </div>
  </div>
 );
};

export default HeroBanner;