import { useEffect, useState } from 'react';
import { contentAPI } from '../../api/api';

export default function ConstructionUpdates() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchUpdates = async () => {
      try {
        const response = await contentAPI.getConstructionUpdates();
        if (mounted) {
          // Use real images from your reference screenshot
          const data = [
            { 
              title: 'Tower A', 
              status: 'Under Construction', 
              img: 'http://googleusercontent.com/image_collection/image_retrieval/46331082767496899_0' 
            },
            { 
              title: 'Tower B', 
              status: 'Completed', 
              img: 'http://googleusercontent.com/image_collection/image_retrieval/10188738880996027501_1' 
            },
            { 
              title: 'Tower C', 
              status: 'Completed', 
              img: 'http://googleusercontent.com/image_collection/image_retrieval/16088790740968448683_2' 
            }
          ];
          setUpdates(data);
        }
      } catch (err) {
        console.error('Failed to load construction updates:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchUpdates();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="py-20 text-center">Loading updates...</div>;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Exact Split Background from Screenshot */}
      <div className="absolute top-0 left-0 w-full h-[50%] bg-[#b2f0e3] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-white -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-[#1a3a3a] font-bold text-center mb-16">
          Construction Updates
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {updates.map((u, i) => (
            <div
              key={i}
              className="relative group rounded-[45px] overflow-hidden shadow-2xl h-[450px] border-4 border-white/50"
            >
              {/* Image with hover zoom effect */}
              <img 
                src={u.img} 
                alt={u.title} 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />

              {/* Exact Frosted Glass Overlay from Reference Image */}
              <div className="absolute bottom-0 left-0 w-full p-6 px-8">
                <div className="bg-[#58b3a5]/40 backdrop-blur-lg border border-white/30 rounded-[30px] p-6 text-center text-white shadow-lg">
                  <p className="text-xl font-extrabold mb-1 tracking-tight">{u.status}</p>
                  <p className="text-sm font-medium opacity-90 mb-4">{u.title}</p>
                  <button className="text-[11px] font-black uppercase tracking-[0.2em] border-b-2 border-white pb-0.5 hover:text-emerald-100 transition-colors">
                    Know More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}