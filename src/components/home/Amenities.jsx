import { useEffect, useState } from 'react';
import { contentAPI } from '../../api/api';
import { 
  Dumbbell, Baby, Map, PersonStanding, 
  Utensils, Coffee, Wifi, Shield, 
  Car, Trees, Building, HeartPulse, 
  Bath, Home, Loader2 
} from 'lucide-react';

export default function Amenities() {
  const [amenities, setAmenities] = useState([]);
  const [header, setHeader] = useState({ title: "Amenities", description: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [amenitiesRes, heroRes] = await Promise.all([
          contentAPI.getAmenities(),
          contentAPI.getHero() // Assuming heading/desc is stored here or similar endpoint
        ]);
        
        if (amenitiesRes.data) setAmenities(amenitiesRes.data);
        // Assuming your backend supports these fields in a settings/hero/amenity-meta call
        if (heroRes.data) {
          setHeader({
            title: heroRes.data.amenity_title || "Amenities",
            description: heroRes.data.amenity_description || "Thoughtfully crafted surroundings that reflect tradition, comfort, and a human-centered design approach."
          });
        }
      } catch (err) {
        console.error('Failed to load:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getIconForTitle = (title) => {
    const lower = title?.toLowerCase() || "";
    const props = { size: 44, strokeWidth: 1.5, className: "text-[#36b3a8]" };

    if (lower.includes('gym')) return <Dumbbell {...props} />;
    if (lower.includes('kid') || lower.includes('play')) return <Baby {...props} />;
    if (lower.includes('jog') || lower.includes('track')) return <Map {...props} />;
    if (lower.includes('yoga') || lower.includes('meditation')) return <PersonStanding {...props} />;
    if (lower.includes('pool')) return <Bath {...props} />;
    if (lower.includes('park') || lower.includes('green')) return <Trees {...props} />;
    return <Home {...props} />;
  };

  if (loading) return <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-[#36b3a8]" /></div>;

  return (
    <section className="py-20 bg-[#f0fdfa]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Dynamic Heading Section */}
        <div className="mb-16 text-left ml-4">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a3a3a] mb-6 font-bold">
            {header.title}
          </h2>
          <p className="text-gray-500 max-w-3xl text-sm md:text-base leading-relaxed">
            {header.description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Building Image from Screenshot */}
          <div className="w-full lg:w-[45%] h-[400px] md:h-[550px] rounded-[40px] overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000"
              alt="Building View"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Circular Icons Grid */}
          <div className="w-full lg:w-[55%] grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-4">
            {amenities.slice(0, 6).map((item, index) => (
              <div key={item.id || index} className="flex flex-col items-center group">
                {/* Perfect Circle Styling matching reference */}
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center mb-5 shadow-sm border border-gray-100 transition-all group-hover:shadow-xl group-hover:-translate-y-1">
                  {getIconForTitle(item.title)}
                </div>
                <p className="text-sm md:text-base font-bold text-slate-700 tracking-tight text-center">
                  {item.title}
                </p>
              </div>
            ))}
            
            {/* Gradient View More Button */}
            <div className="col-span-full mt-6 flex justify-center lg:justify-start lg:pl-10">
              <button className="bg-gradient-to-r from-[#99f6e4] to-[#bef264] text-[#1a3a3a] px-8 py-3 rounded-md shadow-md hover:shadow-lg font-bold text-xs uppercase tracking-widest transition-all">
                View more
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}