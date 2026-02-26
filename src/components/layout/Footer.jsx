import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a3a3a] text-white pt-20 pb-10 overflow-hidden relative">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          
          {/* Column 1: Brand Identity (Spans 4) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-white p-2 rounded-xl">
                <img src="https://img.freepik.com/free-vector/home-with-green-roof-logo_1057-3363.jpg" alt="Logo" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-tight">VIGHNAHARTA</h3>
                <p className="text-[#add666] text-xs font-bold tracking-[0.2em] uppercase">Infinity</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Redefining urban living with premium 1 & 2 BHK homes. Experience a blend of 
              architectural excellence and sustainable luxury in the heart of Vikhroli.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-white/10 hover:border-[#add666] hover:text-[#add666] rounded-full flex items-center justify-center transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation (Spans 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-[#add666]">Navigation</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              {['Home', 'Overview', 'Amenities', 'Floor Plans', 'Updates'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="hover:text-white flex items-center group transition-colors">
                    <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
              <li><a href="/login" className="hover:text-white opacity-50 text-xs">Admin Access</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Glass Card (Spans 6) */}
          <div className="lg:col-span-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-8 md:p-10">
              <h4 className="font-serif text-2xl font-bold mb-8">Visit Our Site</h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-[#add666]/10 rounded-lg flex items-center justify-center text-[#add666] flex-shrink-0">
                      <MapPin size={20} />
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Bldg No. 223/224, Circle<br />
                      Kannamwar Nagar 1,<br />
                      Vikhroli (East), Mumbai
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <a href="tel:+919876543210" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-[#add666]/10 rounded-lg flex items-center justify-center text-[#add666] group-hover:bg-[#add666] group-hover:text-[#1a3a3a] transition-all">
                      <Phone size={20} />
                    </div>
                    <span className="text-sm font-medium">+91 98765 43210</span>
                  </a>
                  <a href="mailto:sales@vighnaharta.in" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-[#add666]/10 rounded-lg flex items-center justify-center text-[#add666] group-hover:bg-[#add666] group-hover:text-[#1a3a3a] transition-all">
                      <Mail size={20} />
                    </div>
                    <span className="text-sm font-medium">sales@vighnaharta.in</span>
                  </a>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#add666] mb-1">MahaRERA Registration</p>
                  <p className="text-sm font-bold">P52000012345</p>
                </div>
                <button className="bg-gradient-to-r from-[#add666] to-[#91c141] text-[#1a3a3a] px-8 py-3 rounded-full font-bold text-sm shadow-xl hover:opacity-90 transition-opacity">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 uppercase tracking-widest">
          <p>© {currentYear} Vighnaharta Group. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}