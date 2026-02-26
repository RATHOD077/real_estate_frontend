import { useEffect, useState } from 'react';
import { contentAPI } from '../../api/api';
import { MapPin } from 'lucide-react';

export default function Hero() {
  const [hero, setHero] = useState({
    main_heading: "THINKING OF A FANTASTIC VICINITY?",
    sub_heading: "20+ PODIUM LUXURIOUS AMENITIES | SPACIOUS BALCONY HOMES*",
    one_bhk_price: "69.99 Lacs*",
    two_bhk_price: "96.99 Lacs*",
    location: "BLDG. NO. 223/224, CIRCLE - KANNAMWAR NAGAR 1, VIKHROLI (EAST)"
  });

  useEffect(() => {
    contentAPI.getHero().then(res => {
      // Ensure we only set state if data exists to avoid blank sections
      if (res.data) {
        setHero(res.data);
      }
    }).catch(err => console.error("Using default content", err));
  }, []);

  const renderHeading = (text) => {
    return text.toUpperCase();
  };

  return (
    <section className="relative w-full bg-white flex flex-col md:flex-row items-center min-h-[600px] overflow-hidden">
      
      {/* Left Side: Building Render */}
      <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center p-6 md:p-12">
        {/* Top Heading Overlay */}
        <div className="mb-8 text-center md:text-left w-full max-w-lg">
          <h2 className="text-[#4a3933] text-2xl md:text-4xl font-bold leading-tight tracking-tight uppercase">
            {/* DYNAMIC MAIN HEADING */}
            {hero.main_heading}
          </h2>
          
          <div className="mt-2 flex flex-wrap gap-2 text-[10px] md:text-xs font-bold text-gray-500 tracking-tighter uppercase">
            {/* DYNAMIC SUB HEADING */}
            <span>{hero.sub_heading}</span>
          </div>
        </div>

        {/* Building Image */}
        <div className="w-full max-w-md md:max-w-[480px] h-[350px] md:h-[450px] rounded-sm overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-700">
          <img 
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000" 
            alt="Vighnaharta Infinity Building" 
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Right Side: Branding & Pricing */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 bg-white">
        
        {/* Branding Section */}
        <div className="mb-12 text-center">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2913/2913520.png" 
            alt="Tree Logo" 
            className="w-20 h-20 mx-auto mb-4 opacity-80" 
          />
          <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-1 font-medium">Vighnaharta</p>
          <h1 className="text-5xl md:text-6xl font-serif text-[#333] tracking-[0.15em] uppercase font-light">
            Infinity
          </h1>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-24 h-[1px] bg-gray-300"></div>
            <div className="w-2 h-2 border border-gray-400 rotate-45"></div>
            <div className="w-24 h-[1px] bg-gray-300"></div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-2 w-full max-w-lg relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-300"></div>

          {/* 1 BHK */}
          <div className="text-center px-4">
            <h3 className="text-lg font-bold text-[#333] uppercase tracking-widest mb-1">Smart 1 BHK</h3>
            <div className="relative inline-block text-gray-400 text-sm italic">
              @ 74.99 Lacs
              <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#d9534f] -rotate-6"></div>
            </div>
            <p className="text-3xl md:text-4xl font-black text-slate-900 mt-2">₹ {hero.one_bhk_price}</p>
            <p className="text-[11px] text-gray-500 uppercase font-bold tracking-widest mt-1">onwards</p>
          </div>

          {/* 2 BHK */}
          <div className="text-center px-4">
            <h3 className="text-lg font-bold text-[#333] uppercase tracking-widest mb-1">Premium 2 BHK</h3>
            <div className="relative inline-block text-gray-400 text-sm italic">
              @ 1.05 CR
              <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#d9534f] -rotate-6"></div>
            </div>
            <p className="text-3xl md:text-4xl font-black text-slate-900 mt-2">₹ {hero.two_bhk_price}</p>
            <p className="text-[11px] text-gray-500 uppercase font-bold tracking-widest mt-1">onwards</p>
          </div>
        </div>

        {/* Location Section */}
        <div className="mt-16 w-full flex flex-col items-center">
          <div className="w-full max-w-md h-[1px] bg-gray-200 mb-8"></div>
          
          <div className="flex items-start gap-3 px-6 py-3 rounded-full hover:bg-slate-50 transition-colors">
            <MapPin className="text-red-600 w-6 h-6 shrink-0 mt-0.5" />
            <div className="text-center">
              <span className="text-[12px] md:text-[13px] font-bold text-slate-700 leading-tight tracking-wide uppercase">
                {hero.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}