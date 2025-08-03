import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from '@studio-freight/lenis';
import '../HeroSection.css'; // Assuming this CSS file contains the necessary styles

// Register GSAP plugins globally once
gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const bannerTextRef = useRef<HTMLDivElement>(null);
  const whiteBgRef = useRef<HTMLPictureElement>(null);
  const videoDesktopRef = useRef<HTMLVideoElement>(null);
  const videoMobileRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Basic guard clause for server-side rendering
    if (typeof window === "undefined") return;
    
    // --- LENIS SMOOTH SCROLL INTEGRATION ---
    // const lenis = new Lenis({
    //   duration: 1, // Slightly longer duration for a more luxurious feel
    //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    //   orientation: 'vertical',
    //   gestureOrientation: 'vertical',
    //   smoothWheel: true,
    //    wheelMultiplier: 1,
    //   touchMultiplier: 2,
    //    infinite: false,
    //   autoResize: true,
      
    // });
    
    // // Connect Lenis to GSAP's ticker for seamless integration
    // lenis.on('scroll', ScrollTrigger.update);
    // gsap.ticker.add((time) => {
    //   lenis.raf(time * 1000);
    // });
    // gsap.ticker.lagSmoothing(0);

    // --- GSAP ANIMATIONS ---

    // Set GSAP defaults for consistent easing
    gsap.defaults({
      ease: "power2.inOut",
    });

    // Initial load-in animation for the text
    const initialTextLoad = gsap.fromTo(
      bannerTextRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 0.5 } // Added a small delay for better user experience
    );

    // Main scroll-triggered timeline
    const introTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: mainScrollRef.current,
        start: "top top",
        end: "bottom+=1000", // Increased the scroll distance for a longer, more impactful animation
        scrub: true,
        pin: true,
        pinSpacing: true, // Re-enabled pinSpacing for a smoother transition to the next section
        anticipatePin: 1,
      }
    });

    introTimeline
      // Phase 1: Text Fade Out (occurs first)
      .to(bannerTextRef.current, {
        y: -100,
        autoAlpha: 0,
        duration: 1, // A relative duration for the text fade
      })
      // Phase 2: White Background Zoom Out and Fade (after the text is gone)
      .to(whiteBgRef.current, {
        scale: 20,
        autoAlpha: 0,
        duration: 2, // A longer relative duration for the dramatic zoom-out
      }, ">") // ">" means this tween starts immediately after the previous one finishes
      // Phase 3: Video Fade In (happens alongside the background zoom-out)
      .to(videoDesktopRef.current, {
        opacity: 1,
        duration: 1,
      }, "<0.5") // Starts slightly after the white background animation begins
      .to(videoMobileRef.current, {
        opacity: 1,
        duration: 1,
      }, "<0.5")
      // Phase 4: A "hold" to keep the pinned section visible for a while before unpinning
      .to({}, { duration: 1 }); // An empty tween to add a pause in the timeline

    // --- VIDEO PLAYBACK TRIGGER (Corrected) ---
    // This trigger now handles the play/pause logic without the autoplay attribute
    ScrollTrigger.create({
      trigger: mainScrollRef.current,
      start: "top top", // The video starts playing immediately on pin
      end: "bottom bottom",
      toggleActions: "play none none reverse", // play on enter, reverse (pause) on leave back
      onEnter: () => {
        const video = window.innerWidth > 991 ? videoDesktopRef.current : videoMobileRef.current;
        if (video) {
          video.play();
          video.style.opacity = '1'; // Ensure the video is visible after playing
        }
      },
      onLeaveBack: () => {
        const video = window.innerWidth > 991 ? videoDesktopRef.current : videoMobileRef.current;
        if (video) {
           video.play();
          // video.currentTime = 0; // Reset video to the beginning
        }
      },
      onEnterBack: () => {
        const video = window.innerWidth > 991 ? videoDesktopRef.current : videoMobileRef.current;
        if (video) {
          video.play();
        }
      }
    });
    
    // --- CLEANUP FUNCTION ---
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // lenis.destroy();
       
    };
  }, []);

  return (
    <div ref={mainScrollRef} className=" h-screen relative w-full" id="main-scrollbar">
      <div className="home-container">
        <div className="home-banner-wrap">
          <div className="home-banner">
            <div className="container">
              <div ref={bannerTextRef} className="banner-txt">
               
              </div>
            </div>

            <picture ref={whiteBgRef} className="white-bg-home">
              <source media="(max-width: 992px)" srcSet="/assets/bg-background.png" />
              <img
                alt="Background image for hero section"
                src="/assets/bg-background.png"
                className="w-full"
              />
            </picture>

            <div className="home-video">
              <div className="banner-video">
                <video
                  ref={videoDesktopRef}
                  loop
                  muted
                  playsInline
                  autoPlay
                  preload="auto"
                  style={{ opacity: 0 }} // Initially hidden
                >
                  <source src="/assets/enrzy.mp4" type="video/webm" />
                </video>
              </div>
              <div className="banner-video">
                <video
                  ref={videoMobileRef}
                  loop
                  muted
                  playsInline
                  autoPlay
                  preload="auto"
                  style={{ opacity: 0 }} // Initially hidden
                >
                  <source src="/assets/enrzy.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;