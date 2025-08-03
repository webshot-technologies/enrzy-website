import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EnrzyAboutSection: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
             toggleActions: "play none play reset",
          },
        }
      );
    }

    // Paragraph animation
    if (paragraphRef.current) {
      gsap.fromTo(
        paragraphRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: 'top 85%',
             toggleActions: "play none play reset",
          },
        }
      );
    }

    // Cards staggered animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
               toggleActions: "play none play reset",
            },
          }
        );
      }
    });

    // Image animation
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 100%',
             toggleActions: "play none play reset",
          },
        }
      );
    }
  }, []);

  return (
    <section  className="counter-grid overflow-x-hidden  ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Left Content */}
        <div className='order-2 md:order-1'>
          <div ref={headerRef}>
            <div
              className="header-element flex items-center justify-start px-3 py-1 rounded-full text-sm font-bold bg-orange-100 base-color mb-4"
              style={{ maxWidth: 'fit-content' }}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              About Us
            </div>
            <h2 className="text-4xl font-semibold text-start flex items-center   gap-3  text-base-secondary mb-8">What Is  <span className='logo-text'><img src="/assets/text_logo.png" style={{ marginTop:'5px'}} alt="df" /></span></h2>
          </div>

          <p ref={paragraphRef} className="text-gray-700 mb-12 text-justify">
           Advance analytics software redefining power asset management. From asset inspection to preventive maintenance and insights for supply chain optimization. ENRZY empowers you to make informed decisions and achieve operational excellence. ENRZY simplifies asset management with its cloud-based platform, turning raw data into actionable insights. Here’s how:
          </p>

          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: 'INTEGRATE',
                desc: 'Integrate data from drones or other inputs including Visual, Thermal & LiDAR.',
              },
              {
                title: 'ANALYZE',
                desc: 'AI-powered algorithms detect issues with precision, enabling proactive maintenance.',
              },
              {
                title: 'COLLABORATE',
                desc: 'Share geo-tagged results, 3D digital twins, and reports for seamless team collaboration.',
              },
              {
                title: 'DELIVER',
                desc: 'Generate detailed, customizable reports in seconds, complete with severity prioritization.',
              },
            ].map((card, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el!)}
                className=" flex flex-col p-4 rounded-lg "
                style={{
                  background: 'rgba(237, 151, 65, 0.19)',
                }}
              >
                <p className="font-bold text-start text-base-secondary mb-1">{card.title}</p>
                <p className="text-sm text-base-secondary  text-start">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div ref={imageRef} className="w-full h-full order-1 md:order-2 ">
          <img
            src="/assets/what-enrzy.jpg"
            alt="About ENRZY"
            className="w-full h-full rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default EnrzyAboutSection;
