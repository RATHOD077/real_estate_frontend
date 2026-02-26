import { useEffect, useState } from 'react';
import { contentAPI } from '../../api/api';
import { Download } from 'lucide-react';

export default function AboutProject() {
  const [about, setAbout] = useState({
    title: 'About Project',
    description: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchAbout = async () => {
      try {
        const res = await contentAPI.getAboutProject();
        if (mounted && res?.data) {
          setAbout({
            title: res.data.title || 'About Project',
            description: res.data.description || ''
          });
        }
      } catch (err) {
        console.error('Failed to load About Project data:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchAbout();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="py-20 bg-[#f4f9f7] animate-pulse h-[500px]" />;

  return (
    <section id="overview" className="py-24 bg-[#f0f9f6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: EXACT Screenshot Circle Layout */}
          <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
            
            {/* Background Decorative Thin Circle - matches the subtle line in img */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white/40 rounded-full -z-0"></div>

            {/* 1. Main Central Large Circle (Terrace View) */}
            <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-[6px] border-white shadow-lg z-10 transform -translate-x-4">
              <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop"
                alt="Outdoor Terrace"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* 2. Top Left Circle - Small Overlap (Interior Lobby) */}
            <div className="absolute top-0 left-4 md:left-12 w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border-[6px] border-white shadow-xl z-20">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop"
                alt="Lobby Area"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* 3. Bottom Right Circle - Overlapping Main Circle (Gym Area) */}
            <div className="absolute bottom-4 right-4 md:right-16 w-28 h-28 md:w-48 md:h-48 rounded-full overflow-hidden border-[6px] border-white shadow-xl z-30 transform -translate-x-8">
              <img
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop"
                alt="Gym Area"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Content Side */}
          <div className="flex flex-col items-start">
            <h2 className="text-4xl md:text-5xl font-serif text-[#1a3a3a] mb-8 font-bold">
              {about.title}
            </h2>
            
            <div className="text-gray-600 leading-relaxed space-y-6 text-base md:text-lg max-w-xl">
              {about.description ? (
                <p className="whitespace-pre-line">{about.description}</p>
              ) : (
                <>
                  <p>
                    At Vighnaharta Enclave, every detail reflects the grandest gesture of 
                    life in the most authentic and desirable home. Guided by a humanist 
                    approach, the architecture places people at the heart of the space. 
                    Built on the foundations of comfort, it evokes a true sense of freedom, 
                    protection, and belonging.
                  </p>
                  <p>
                    “The moment I entered the house, it felt welcomed” — this feeling 
                    defines the privilege Vighnaharta Enclave offers. Thoughtfully 
                    designed with crafted amenities and timeless choices, the space 
                    resonates with the warmth and authenticity that you and your family 
                    truly deserve. It's the place your soul has long been searching for.
                  </p>
                </>
              )}
            </div>

            <button className="mt-10 bg-gradient-to-r from-[#add666] to-[#91c141] hover:shadow-lg text-[#1a3a3a] px-8 py-3 rounded-md font-bold transition-all flex items-center gap-3">
              Download Brochure
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
}