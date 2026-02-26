import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const buildings = [
  {
    id: 1,
    name: "Vighnaharta Aaradhya",
    status: "Newly Launched",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Vighnaharta Enclave",
    status: "Newly Launched",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Vighnaharta Infinity",
    status: "Newly Launched",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Vighnaharta Heights",
    status: "Premium Living",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Vighnaharta Residency",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function Explore() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollBy({ left: -350, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-[#b2e7d5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-[#1a3a3a] text-center mb-10 font-bold tracking-tight">
          Explore More Buildings in the Township
        </h2>

        <div className="relative flex items-center justify-center">
          {/* Custom Minimal Navigation Arrows */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-40 bg-[#4ade80] text-white p-1.5 rounded-sm shadow-md hover:bg-[#22c55e] transition-all"
          >
            <ChevronLeft size={24} />
          </button>

          <button 
            onClick={() => scroll('right')}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-40 bg-[#4ade80] text-white p-1.5 rounded-sm shadow-md hover:bg-[#22c55e] transition-all"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-2"
            style={{ 
              msOverflowStyle: 'none', 
              scrollbarWidth: 'none' 
            }}
          >
            <style dangerouslySetInnerHTML={{__html: `
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}} />

            {buildings.map((bldg) => (
              <div 
                key={bldg.id}
                className="min-w-[280px] md:min-w-[380px] h-[350px] md:h-[450px] relative rounded-2xl overflow-hidden snap-center shadow-lg group/card bg-white"
              >
                {/* Building Image */}
                <img 
                  src={bldg.image} 
                  alt={bldg.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                />

                {/* Bottom Status Bar - Clean Horizontal Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-14 flex items-center justify-center bg-gradient-to-r from-[#ccf594] via-[#ecff7d] to-[#ccf594]">
                  <p className="text-[#1a3a3a] font-bold text-xs md:text-sm tracking-wide">
                    {bldg.status} - <span className="font-semibold">{bldg.name}</span>
                  </p>
                </div>

                {/* Slight lighting overlay */}
                <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}