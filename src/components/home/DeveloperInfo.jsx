import { useEffect, useState } from 'react';
import { contentAPI } from '../../api/api';

export default function DeveloperInfo() {
  const [dev, setDev] = useState({
    title: 'About Developer',
    description: 'Vighnaharta Developers is more than just a real estate company—we are dream weavers, committed to building not just homes, but better lives. With a legacy of expert craftsmanship and a forward-thinking approach, we’re transforming skylines and setting new standards in urban living. Our foundation rests on integrity, excellence, and innovation, ensuring every project is a perfect blend of creativity, functionality, and sustainability.'
  });

  useEffect(() => {
    contentAPI.getDeveloper().then(res => {
        if(res.data) setDev(res.data);
    }).catch(err => console.log("Using default developer content"));
  }, []);

  const stats = [
    { label: 'Projects', value: '6' },
    { label: 'sq. ft. area developed', value: '1.32 LAC' },
    { label: 'Happy Families', value: '449+' },
    { label: 'sq. ft. ongoing', value: '3.77 LAC' },
    { label: 'sq. ft. Area Upcoming', value: '2.7 LAC' },
  ];

  return (
    <section className="bg-[#f0f9f6] pt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title and Description */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-serif text-[#1a3a3a] font-bold mb-6">
            {dev.title}
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {dev.description}
          </p>
        </div>

        {/* Floating Stats Bar */}
        <div className="relative z-20 -mb-10">
          <div className="bg-[#b2f0e3] rounded-full py-6 px-10 shadow-sm flex flex-wrap justify-around items-center gap-4">
            {stats.map((s, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-2xl font-bold text-[#1a3a3a]">{s.value}</div>
                <div className="text-[10px] uppercase font-semibold text-gray-500 tracking-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Background Building Image */}
        <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" 
              alt="Developer Architecture" 
              className="w-full h-full object-cover"
            />
            {/* Overlay to fade the bottom if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#f0f9f6] via-transparent to-transparent opacity-40"></div>
        </div>
      </div>
    </section>
  );
}