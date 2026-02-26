import { useEffect, useState } from 'react';
import { contentAPI } from '../../api/api';

export default function EditAbout() {
  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    contentAPI.getAboutProject()
      .then(res => {
        setForm({
          title: res.data.title || '',
          description: res.data.description || '',
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to load data');
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
      await contentAPI.updateAboutProject(form);
      setMessage('About section updated successfully!');
      const res = await contentAPI.getAboutProject();
      setForm(res.data);
    } catch (err) {
      console.error('Save error:', err);
      setMessage(err.response?.data?.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-8 text-emerald-900">Edit About Project Section</h1>

      {message && (
        <div className={`p-4 mb-6 rounded ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g. About Project"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={10}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter full description..."
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-emerald-600 text-white px-8 py-3 rounded hover:bg-emerald-700 disabled:opacity-60 transition-colors font-medium"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}