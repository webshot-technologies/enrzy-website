import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../App.css';

gsap.registerPlugin(ScrollTrigger);

const WhyEnrzySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mobile detection
      const isMobile = window.innerWidth < 768;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 70%' : 'top 45%', // Higher trigger point on mobile
          end: isMobile ? '+=200px' : '+=300px', // Shorter scroll distance on mobile
          toggleActions: "play none play reverse",
          markers: false // Set to true for debugging
        },
      });

      // Title animation
      tl.from('.why-title', {
        y: isMobile ? 30 : 50, // Smaller movement on mobile
        opacity: 0,
        duration: isMobile ? 0.4 : 0.6, // Faster on mobile
        ease: 'power3.out',
      });

      // Image animation
      tl.from('.why-image', {
        y: isMobile ? 50 : 80, // Less vertical movement on mobile
        scale: 0.95,
        opacity: 0,
        rotate: isMobile ? 2 : 5, // Less rotation on mobile
        duration: isMobile ? 0.6 : 0.8, // Faster on mobile
        ease: 'power3.out',
      }, isMobile ? '-=0.1' : '-=0.2');

      // Cards animation
      tl.from('.why-card', {
        y: isMobile ? 100 : 200, // Less vertical movement on mobile
        x: isMobile ? -15 : -30, // Less horizontal movement on mobile
        opacity: 0,
        stagger: isMobile ? 0.3 : 0.5, // Faster stagger on mobile
        duration: isMobile ? 0.7 : 1, // Faster on mobile
        ease: 'power3.out',
      }, isMobile ? '-=0.1' : '-=0.2');
    }, sectionRef);

    // Handle responsive behavior
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const features = [
    {
      icon: "./assets/advancedai.svg",
      title: "Advanced AI Detection",
      description: "Identify defects like corrosion, cracks, and vegetation encroachment with unparalleled accuracy.",
      color: "bg-base"
    },
    {
      icon: "./assets/integratedworkflow.svg",
      title: "Integrated Workflows",
      description: "Convert detected faults into actionable tasks, ensuring streamlined repairs.",
      color: "bg-base"
    },
    {
      icon: "./assets/datafusion.svg",
      title: "Comprehensive Data Fusion",
      description: "Combine visual, thermal, and LiDAR data for a holistic view of assets.",
      color: "bg-base"
    },
    {
      icon: "./assets/digitaltwins.svg",
      title: "Digital Twins",
      description: "Create photorealistic 3D models for remote inspections and better decision-making.",
      color: "bg-base"
    },
  ];

  return (
    <div ref={sectionRef} className="bg-background section-padding px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <div className="relative">
            <h2 className="why-title flex align-center gap-3 text-base-secondary text-start text-4xl md:text-4xl font-semibold text-foreground relative z-10">
              Why <span className='logo-text'><img src="/assets/text_logo.png" alt="df" /></span>
            </h2>
          </div>
        </div>

        {/* Image/Video Placeholder */}
        <div className="why-image relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl  md:h-96 flex items-center justify-center shadow-lg mb-8 md:mb-12">
          <img
            src="/assets/why-enrzy.jpg"
            alt="ENRZY solution visualization"
            className="w-full h-full object-cover rounded-md object-center"
          />
          <div 
            className="absolute inset-0 rounded-2xl border-2 border-transparent"
            style={{ backgroundClip: 'padding-box' }}
          />
        </div>
        {/* <div
  className="why-image relative bg-[url('/assets/why-enrzy.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl h64 md:h-96 flex items-center justify-center shadow-lg mb-8 md:mb-12"
>
  <div className="absolute inset-0 rounded-2xl  border-2 border-transparent" />
</div> */}


        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
          {features.map((feature, index) => (
            <div key={index} className="why-card group bg-gray-100  rounded-2xl px-6 py-8 shadow-lg  text-center cursor-pointer">
              <div className="relative transition-all  py-4 md:py-0 duration-300 transform hover:-translate-y-2 border border-gray-100 rounded-lg">
                <div className={`w-10 h-10 md:w-12 md:h-12 ${feature.color} rounded-full flex items-center justify-center mb-3 md:mb-4 text-white text-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12  md:mx-0`}>
                  <img
                    src={feature.icon}                
                    alt={feature.title}
                    className="object-contain svg-icon "
                  />
                </div>
                <h3 className="text-start font-semibold mb-2 md:mb-3 text-foreground group-hover:text-[hsl(var(--workflow-orange))] transition-colors duration-300 text-base md:text-lg">
                  {feature.title}
                </h3>
                <p className="font-medium text-muted-foreground text-start leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[hsl(var(--workflow-orange))]/10 to-purple-500/10 rounded-full blur-xl opacity-20 scale-100" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-green-500/10 rounded-full blur-xl opacity-20 scale-100" />
        </div>
      </div>
    </div>
  );
};

export default WhyEnrzySection;