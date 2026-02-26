import { useEffect, useState } from 'react';
import { contentAPI } from '../../api/api';
import { Plus, Minus } from 'lucide-react'; // Using Plus/Minus to match the screenshot icon style

export default function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    let mounted = true;
    const fetchFaqs = async () => {
      try {
        const res = await contentAPI.getFaqs();
        if (mounted) {
          const data = Array.isArray(res?.data) ? res.data : [];
          setFaqs(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) setError('Could not load FAQs');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchFaqs();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="py-20 bg-[#f0f9f6] text-center">Loading...</div>;

  return (
    <section className="py-20 bg-[#f0f9f6]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Centered Serif Title */}
        <h2 className="text-4xl font-serif font-bold text-center text-[#1a3a3a] mb-12">
          Frequently Asked Questions
        </h2>

        {faqs.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No FAQs available</div>
        ) : (
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group transition-all duration-300"
              >
                {/* Long Pill Shape Header */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex justify-between items-center px-10 py-4 bg-[#b2f0e3] hover:bg-[#a1e6d8] rounded-full shadow-sm transition-colors text-left"
                >
                  <span className="text-sm font-medium text-[#1a3a3a] pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 text-[#1a3a3a]">
                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                {/* Animated Dropdown Answer */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-12 py-6 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}