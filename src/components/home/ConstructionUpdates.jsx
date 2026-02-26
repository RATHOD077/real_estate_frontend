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
          // Maintaining the data structure while using accurate replacement images
          const data = [
            { 
              title: 'Tower A', 
              status: 'Under Construction', 
              img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop' 
            },
            { 
              title: 'Tower B', 
              status: 'Completed', 
              img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop' 
            },
            { 
              title: 'Tower C', 
              status: 'Completed', 
              img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop' 
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

  if (loading) return <div className="py-20 text-center font-serif text-[#1a3a3a]">Loading updates...</div>;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Exact Split Background: Mint Top, White Bottom */}
      <div className="absolute top-0 left-0 w-full h-[55%] bg-[#b2f0e3] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-[45%] bg-white -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-[#1a3a3a] font-bold text-center mb-14 tracking-tight">
          Construction Updates
        </h2>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
          {updates.map((u, i) => (
            <div
              key={i}
              className="relative group rounded-[40px] overflow-hidden shadow-xl h-[480px] border-[6px] border-white/40"
            >
              {/* Image Container */}
              <div className="w-full h-full overflow-hidden">
                <img 
                  src={u.img} 
                  alt={u.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              {/* Exact Frosted Overlay from Reference */}
              <div className="absolute bottom-0 left-0 w-full p-4 pb-6">
                <div className="bg-[#58b3a5]/50 backdrop-blur-md border border-white/20 rounded-[30px] py-6 px-4 text-center text-white shadow-inner">
                  <h3 className="text-xl font-bold mb-0.5 tracking-tight uppercase">
                    {u.status}
                  </h3>
                  <p className="text-xs font-semibold opacity-80 mb-4 tracking-wider">
                    {u.title}
                  </p>
                  <button className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] border-b-2 border-white pb-1 hover:opacity-70 transition-all">
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