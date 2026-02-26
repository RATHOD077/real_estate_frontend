import { useEffect, useState } from 'react';
import { contentAPI } from '../../api/api';

export default function EditHero() {
  const [form, setForm] = useState({
    main_heading: '',
    sub_heading: '',
    one_bhk_price: '',
    two_bhk_price: '',
    location: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    contentAPI.getHero()
      .then(res => {
        setForm({
          main_heading: res.data.main_heading || '',
          sub_heading: res.data.sub_heading || '',
          one_bhk_price: res.data.one_bhk_price || '',
          two_bhk_price: res.data.two_bhk_price || '',
          location: res.data.location || '',
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to load existing data');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await contentAPI.updateHero(form);
      setMessage('Hero section updated successfully!');
      const res = await contentAPI.getHero();
      setForm(res.data);
    } catch (err) {
      console.error('Save error:', err);
      setMessage(err.response?.data?.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading hero content...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-emerald-900">Edit Hero Section</h1>

      {message && (
        <div className={`p-4 mb-6 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Main Heading</label>
          <input
            name="main_heading"
            value={form.main_heading}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter main heading..."
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Sub Heading / Tagline</label>
          <input
            name="sub_heading"
            value={form.sub_heading}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter tagline..."
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">1 BHK Price</label>
          <input
            name="one_bhk_price"
            value={form.one_bhk_price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g. 69.99 Lacs*"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">2 BHK Price</label>
          <input
            name="two_bhk_price"
            value={form.two_bhk_price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g. 96.99 Lacs*"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter full address..."
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-60 transition-colors font-medium"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}