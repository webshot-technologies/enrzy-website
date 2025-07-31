import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from '@studio-freight/lenis';
import '../HeroSection.css';


const HeroSection: React.FC = () => {
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const bannerTextRef = useRef<HTMLDivElement>(null);
  const whiteBgRef = useRef<HTMLPictureElement>(null);
  const videoDesktopRef = useRef<HTMLVideoElement>(null);
  const videoMobileRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // --- LENIS SMOOTH SCROLL INTEGRATION ---
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // --- GSAP SETUP & ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.defaults({
      ease: "power2.inOut",
    });

    // Initial load-in animation for the text
    gsap.fromTo(
      bannerTextRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5 }
    );

    // --- UPDATED SCROLL-TRIGGERED TIMELINE FOR PINNING ---
    
    const introTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: mainScrollRef.current,
        start: "top top", // The animation starts when the top of the section hits the top of the viewport
        end: "+=100", // <-- CRITICAL CHANGE: The animation now completes over 500px of scrolling.
        scrub: true,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        // Optional: onUpdate callback to debug progress.
        // onUpdate: self => console.log("progress:", self.progress.toFixed(3))
      }
    });

    introTimeline
      .to(bannerTextRef.current, {
        y: -100,
        autoAlpha: 0,
        duration: 4,
      })
      .to(whiteBgRef.current, {
        scale: 20,
        autoAlpha: 0,
        duration: 5,
      }, "<")
      // We can remove the empty tween `.to({}, { duration: 1 })`
      // since the animation will be completed within the 500px scroll range.

    // --- VIDEO PLAYBACK TRIGGER ---
    // This trigger is fine as it is. It will start the video once the intro
    // animation is complete and the pin is released.
    ScrollTrigger.create({
      trigger: mainScrollRef.current,
      start: "bottom center",
      toggleActions: "play none none reverse",
      onEnter: () => {
        if (window.innerWidth > 991) {
          videoDesktopRef.current?.play();
        } else {
          videoMobileRef.current?.play();
        }
      },
      onLeaveBack: () => {
        if (window.innerWidth > 991) {
          videoDesktopRef.current?.pause();
        } else {
          videoMobileRef.current?.pause();
        }
      },
    });

    // --- CLEANUP FUNCTION ---
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      lenis.destroy();
    };
  }, []);

  return (
    // ... (rest of the component JSX is unchanged)
    <div ref={mainScrollRef} className="relative w-full" id="main-scrollbar">
      <div className="home-container">
        <div className="home-banner-wrap">
          <div className="home-banner">
            <div className="container">
              <div ref={bannerTextRef} className="banner-txt">
                <h1 className="banner-head text-black">
                  <span className="block text-yellow-400">
                    Integrated Drone Solutions
                  </span>
                  Enabling Large-Scale Impact
                </h1>
                <p className="comm-txt text-black">
                  Enhancing Productivity, People, And Planet
                </p>
                <a
                  href="https://aereo.io/solutions/"
                  target="_self"
                  className="button text-black"
                >
                  Explore<span className="ml-2">→</span>
                </a>
              </div>
            </div>

            <picture ref={whiteBgRef} className="white-bg-home">
              <source
                media="(max-width:400px)"
                srcSet="https://aereo.io/wp-content/themes/Aereo/assets/img/mob-white-bg.png"
              />
              <source
                media="(max-width:480px)"
                srcSet="https://aereo.io/wp-content/themes/Aereo/assets/img/big-mob-white-bg.png"
              />
              <source
                media="(max-width:990px)"
                srcSet="https://aereo.io/wp-content/themes/Aereo/assets/img/tab-white-bg.png"
              />
              <img
                alt=""
                src="https://aereo.io/wp-content/themes/Aereo/assets/img/home-white-bg.svg"
                className="w-full"
              />
            </picture>

            <div className="home-video">
              <div className="banner-video">
                <video
                  ref={videoDesktopRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src="/assets/enrzy.mp4" type="video/webm" />
                </video>
              </div>
              <div className="banner-video">
                <video
                  ref={videoMobileRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src="/assets/enrzy.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div style={{ height: "100vh", background: "lightgray" }}>
        <FeaturesSection />
      </div> */}
    </div>
  );
};

export default HeroSection;