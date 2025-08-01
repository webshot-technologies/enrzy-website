import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoBackgroundTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoWrapperRef.current || !bgImageRef.current) {
      console.warn("Refs not available, animation setup skipped.");
      return;
    }

    const container = containerRef.current;
    const videoWrapper = videoWrapperRef.current;
    const bgImage = bgImageRef.current;

    const mm = gsap.matchMedia();

    mm.add("all", () => {
      // Set initial states. The video is full screen but dimmed.
      gsap.set(videoWrapper, { opacity: 0.2, willChange: 'opacity' });
      gsap.set(bgImage, { scale: 1, opacity: 1, willChange: 'transform, opacity' });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // The animation itself:
      // 1. The background image scales UP (zooms in) and fades out
      tl.to(bgImage, {
        scale: 1.5, // Changed this value to create a more noticeable zoom-in effect
        opacity: 0,
        ease: 'power2.inOut',
        duration: 1,
      });

      // 2. At the same time, the video fades in to full opacity
      tl.to(videoWrapper, {
        opacity: 1,
        ease: 'power2.inOut',
        duration: 1,
      }, 0);
      
      // We can also add a subtle parallax to the video to create more depth
      gsap.to(videoWrapper, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })

    });

    return () => mm.revert();
  }, []);

  return (
    <div className="font-inter text-white relative">
      <section
        ref={containerRef}
        className="relative flex justify-center items-center h-screen overflow-hidden"
        style={{ zIndex: 10 }}
      >
        <div
          ref={bgImageRef}
          className="absolute inset-0 bg-center bg-no-repeat bg-cover pointer-events-none"
          style={{
            backgroundImage: "url('/assets/bg-transparent.png')",
            zIndex: 10,
          }}
        />
        <div
          ref={videoWrapperRef}
          className="absolute inset-0 overflow-hidden"
          style={{
            zIndex: 5,
          }}
        >
          <video
            src="/assets/enrzy.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* <div className="relative text-center z-20">
          <h1 className="text-5xl md:text-8xl font-bold">Your Headline</h1>
          <p className="mt-4 text-lg md:text-2xl text-white/70">A caption to set the mood.</p>
        </div> */}
      </section>
      
      {/* <div className="h-[150vh] bg-neutral-900 flex justify-center items-center">
        <h2 className="text-3xl text-neutral-500">More Content Below</h2>
      </div> */}
    </div>
  );
};

export default VideoBackgroundTransition;