import { useEffect, useState } from 'react';
import { contentAPI } from '../../api/api';

export default function FloorPlans() {
  const [plans, setPlans] = useState([]);
  const [activeWing, setActiveWing] = useState('East Wing');
  const [activeTab, setActiveTab] = useState(0); // For 1bhk, 2bhk, 5,6 bhk
  const [loading, setLoading] = useState(true);

  const wings = ['All', 'East Wing', 'West Wing', 'North Wing', 'South Wing'];
  const unitLabels = ['1 bhk', '2 bhk', '5,6 bhk'];

  useEffect(() => {
    contentAPI.getFloorPlans().then(res => {
      setPlans(res.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Matching the specific design from the screenshot
  return (
    <section id="floor-plans" className="py-16 bg-[#b2f0e3] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Wing Navigation */}
        <div className="flex justify-end gap-6 mb-12 text-sm font-medium text-emerald-800/60">
          {wings.map(wing => (
            <button 
              key={wing} 
              onClick={() => setActiveWing(wing)}
              className={`pb-1 border-b-2 transition-all ${activeWing === wing ? 'border-emerald-700 text-emerald-900' : 'border-transparent'}`}
            >
              {wing}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side: Large 3D Plan Card */}
          <div className="w-full lg:w-1/2 bg-white rounded-[40px] p-8 shadow-sm">
            <div className="aspect-square flex items-center justify-center overflow-hidden rounded-3xl">
              <img 
                src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1000" 
                alt="3D Floor Plan" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right Side: Info and Unit Selection */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
            <div className="bg-white rounded-[40px] p-10 w-full max-w-md shadow-sm text-center">
              
              {/* Unit Type Toggles */}
              <div className="flex gap-2 justify-center mb-8">
                {unitLabels.map((label, idx) => (
                  <button
                    key={label}
                    onClick={() => setActiveTab(idx)}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                      activeTab === idx 
                        ? 'bg-[#58b3a5] text-white shadow-md' 
                        : 'bg-[#b8e2dc] text-[#58b3a5]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Data Display */}
              <div className="space-y-4 mb-8">
                <p className="text-gray-500 font-medium">Type- <span className="text-slate-800 ml-1">{unitLabels[activeTab].toUpperCase()}</span></p>
                <p className="text-gray-500 font-medium">Area- <span className="text-slate-800 ml-1">380-411 RCA Sq.ft</span></p>
                <p className="text-gray-500 font-medium italic">Price - <span className="text-slate-800 ml-1">Click for price</span></p>
              </div>

              <button className="bg-gradient-to-r from-[#add666] to-[#91c141] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-opacity">
                Download Floor Plan
              </button>
            </div>

            {/* Thumbnail Gallery matching the image */}
            <div className="flex gap-4 mt-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-24 h-24 bg-white/50 rounded-2xl p-2 border border-white/40 cursor-pointer hover:bg-white transition-colors">
                  <img src="https://images.unsplash.com/photo-1628592102751-ba83b0314276?q=80&w=200" alt="thumb" className="w-full h-full object-contain opacity-60" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}