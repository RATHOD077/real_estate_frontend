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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await contentAPI.getAmenities();
        if (Array.isArray(res.data)) {
          setAmenities(res.data);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error('Failed to load amenities:', err);
        setError('Could not load amenities at the moment');
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  // Automatic icon mapping based on title keywords
  const getIconForTitle = (title) => {
    if (!title) return <Home size={40} />;
    const lower = title.toLowerCase();

    if (lower.includes('gym') || lower.includes('fitness')) return <Dumbbell size={40} />;
    if (lower.includes('kid') || lower.includes('play') || lower.includes('child')) return <Baby size={40} />;
    if (lower.includes('jog') || lower.includes('run') || lower.includes('track')) return <Map size={40} />;
    if (lower.includes('yoga') || lower.includes('meditation')) return <PersonStanding size={40} />;
    if (lower.includes('pool') || lower.includes('swim')) return <Bath size={40} />;
    if (lower.includes('park') || lower.includes('garden') || lower.includes('green')) return <Trees size={40} />;
    if (lower.includes('security') || lower.includes('guard')) return <Shield size={40} />;
    if (lower.includes('parking') || lower.includes('car')) return <Car size={40} />;
    if (lower.includes('club') || lower.includes('house') || lower.includes('community')) return <Building size={40} />;
    if (lower.includes('spa') || lower.includes('massage') || lower.includes('wellness')) return <HeartPulse size={40} />;
    if (lower.includes('cafe') || lower.includes('coffee') || lower.includes('dining')) return <Coffee size={40} />;
    if (lower.includes('wifi') || lower.includes('internet')) return <Wifi size={40} />;
    if (lower.includes('restaurant') || lower.includes('food')) return <Utensils size={40} />;

    // Default fallback
    return <Home size={40} />;
  };

  if (loading) {
    return (
      <section className="py-20 bg-[#f0f9f6]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-emerald-600" />
          <p className="mt-4 text-gray-600">Loading amenities...</p>
        </div>
      </section>
    );
  }

  if (error || amenities.length === 0) {
    return (
      <section className="py-20 bg-[#f0f9f6]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xl text-gray-600">{error || 'No amenities available at the moment'}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#f0f9f6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a3a3a] mb-4">Amenities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thoughtfully crafted surroundings that reflect tradition, comfort, and a human-centered design approach.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Large Image (same as your original) */}
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px] lg:h-[600px]">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000"
              alt="Rooftop Amenities"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Amenities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-6 text-center">
            {amenities.map((item, index) => (
              <div 
                key={item.id || index} 
                className="flex flex-col items-center group"
              >
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center mb-4 shadow-md border border-emerald-50 transition-all group-hover:scale-110 group-hover:shadow-xl">
                  <div className="text-[#36b3a8] w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                    {getIconForTitle(item.title)}
                  </div>
                </div>
                <p className="text-sm md:text-base font-bold text-slate-700 uppercase tracking-tight">
                  {item.title}
                </p>
              </div>
            ))}

            {/* View More Button */}
            <div className="col-span-full mt-8 flex justify-center lg:justify-start lg:pl-8">
              <button className="bg-gradient-to-r from-[#91c141] to-[#b3d47d] text-white px-10 py-4 rounded-md shadow-lg hover:opacity-90 font-semibold text-base transition-all">
                View More Amenities
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}