import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoScrollScaler: React.FC = () => {
  const videoContainerWrapperRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Reset video box size immediately when switching to mobile
      if (mobile && videoBoxRef.current) {
        gsap.set(videoBoxRef.current, {
          width: '90vw',
          height: '50vh'
        });
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!videoContainerWrapperRef.current || !videoBoxRef.current) {
      console.warn("Refs not available, animation setup skipped.");
      return;
    }

    const videoBox = videoBoxRef.current;
    const videoContainerWrapper = videoContainerWrapperRef.current;

    // Calculate dimensions
    const wrapperWidth = videoContainerWrapper.offsetWidth;
    const wrapperHeight = videoContainerWrapper.offsetHeight;
    
    // Mobile settings (simpler, one-stage scaling)
    if (isMobile) {
      const maxWidth = wrapperWidth * 0.9;
      const maxHeight = wrapperHeight * 0.7;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: videoContainerWrapper,
          start: "top top",
          end: "+=200vh", // Shorter scroll distance for mobile
          scrub: 1,
          pin: true,
          pinSpacing: true,
          markers: false,
          onUpdate: (self) => {
            const progress = self.progress;
            // Single scaling stage for mobile
            gsap.set(videoBox, { 
              width: gsap.utils.interpolate(wrapperWidth * 0.6, maxWidth, progress),
              height: gsap.utils.interpolate(wrapperHeight * 0.4, maxHeight, progress),
              borderRadius: gsap.utils.interpolate(20, 0, progress)
            });
          }
        }
      });

      return () => {
        tl.kill();
        window.removeEventListener('resize', checkMobile);
      };
    }

    // Desktop settings (multi-stage scaling)
    const maxWidth = Math.min(wrapperWidth * 0.9, 1200);
    const maxHeight = Math.min(wrapperHeight * 0.9, (maxWidth * 9) / 16);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoContainerWrapper,
        start: "top top",
        end: "+=700vh",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        markers: false,
        anticipatePin: 1,
        refreshPriority: -1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          if (progress < 0.15) {
            gsap.set(videoBox, { 
              width: gsap.utils.interpolate(300, maxWidth * 0.3, progress / 0.15),
              height: gsap.utils.interpolate(200, maxHeight * 0.3, progress / 0.15),
              borderRadius: gsap.utils.interpolate(20, 18, progress / 0.15)
            });
          } else if (progress < 0.3) {
            gsap.set(videoBox, { 
              width: gsap.utils.interpolate(maxWidth * 0.3, maxWidth * 0.45, (progress - 0.15) / 0.15),
              height: gsap.utils.interpolate(maxHeight * 0.3, maxHeight * 0.45, (progress - 0.15) / 0.15),
              borderRadius: gsap.utils.interpolate(18, 15, (progress - 0.15) / 0.15)
            });
          } else if (progress < 0.45) {
            gsap.set(videoBox, { 
              width: gsap.utils.interpolate(maxWidth * 0.45, maxWidth * 0.6, (progress - 0.3) / 0.15),
              height: gsap.utils.interpolate(maxHeight * 0.45, maxHeight * 0.6, (progress - 0.3) / 0.15),
              borderRadius: gsap.utils.interpolate(15, 12, (progress - 0.3) / 0.15)
            });
          } else if (progress < 0.6) {
            gsap.set(videoBox, { 
              width: gsap.utils.interpolate(maxWidth * 0.6, maxWidth * 0.75, (progress - 0.45) / 0.15),
              height: gsap.utils.interpolate(maxHeight * 0.6, maxHeight * 0.75, (progress - 0.45) / 0.15),
              borderRadius: gsap.utils.interpolate(12, 8, (progress - 0.45) / 0.15)
            });
          } else if (progress < 0.8) {
            gsap.set(videoBox, { 
              width: gsap.utils.interpolate(maxWidth * 0.75, maxWidth * 0.9, (progress - 0.6) / 0.2),
              height: gsap.utils.interpolate(maxHeight * 0.75, maxHeight * 0.9, (progress - 0.6) / 0.2),
              borderRadius: gsap.utils.interpolate(8, 4, (progress - 0.6) / 0.2)
            });
          } else {
            gsap.set(videoBox, { 
              width: gsap.utils.interpolate(maxWidth * 0.9, maxWidth, (progress - 0.8) / 0.2),
              height: gsap.utils.interpolate(maxHeight * 0.9, maxHeight, (progress - 0.8) / 0.2),
              borderRadius: gsap.utils.interpolate(4, 0, (progress - 0.8) / 0.2)
            });
          }
        }
      }
    });

    return () => {
      tl.kill();
      window.removeEventListener('resize', checkMobile);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  return (
    <div className="font-inter">
      <section
        ref={videoContainerWrapperRef}
        className="relative flex justify-center items-center min-h-screen overflow-hidden "
        style={{ zIndex: 10 }}
      >
        <div
          ref={videoBoxRef}
          className="absolute bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out"
          style={{ 
            width: isMobile ? '60vw' : '300px', // Start larger on mobile
            height: isMobile ? '40vh' : '200px', // Start larger on mobile
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            maxWidth: isMobile ? '90vw' : '1200px'
          }}
        >
          <video
            src="./assets/enrzy.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ 
              filter: 'brightness(1.1) contrast(1.05)',
            }}
          >
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none opacity-30"></div>
        </div>

        {isMobile && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm flex flex-col items-center space-y-2">
            <span className="text-xs">Scroll to expand</span>
            <div className="w-1 h-8 bg-white/30 rounded-full">
              <div className="w-full h-2 bg-white/80 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default VideoScrollScaler;