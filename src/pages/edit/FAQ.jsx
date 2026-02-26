import { useEffect, useState } from 'react';
import { contentAPI } from '../../api/api';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function EditFaqs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Form fields
  const [form, setForm] = useState({
    question: '',
    answer: '',
    display_order: ''
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    try {
      const res = await contentAPI.getFaqs();
      setFaqs(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMessage('Failed to load FAQs');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) {
      setMessage('Question and answer are required');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      if (editingId) {
        // Update
        await contentAPI.updateFaq(editingId, form);
        setMessage(`FAQ updated successfully`);
        setFaqs(faqs.map(f => f.id === editingId ? { ...f, ...form } : f));
        setEditingId(null);
      } else {
        // Create
        const res = await contentAPI.createFaq({
          ...form,
          display_order: form.display_order || faqs.length + 1
        });
        setFaqs([...faqs, res.data]);
        setMessage(`New FAQ added`);
      }

      // Reset form
      setForm({ question: '', answer: '', display_order: '' });
    } catch (err) {
      setMessage('Failed to save FAQ');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (faq) => {
    setForm({
      question: faq.question || '',
      answer: faq.answer || '',
      display_order: faq.display_order || ''
    });
    setEditingId(faq.id);
  };

  const handleDelete = async (id, question) => {
    if (!window.confirm(`Delete "${question.substring(0, 50)}..."?`)) return;

    setSaving(true);
    try {
      await contentAPI.deleteFaq(id);
      setFaqs(faqs.filter(f => f.id !== id));
      setMessage('FAQ deleted successfully');
      if (editingId === id) {
        setEditingId(null);
        setForm({ question: '', answer: '', display_order: '' });
      }
    } catch (err) {
      setMessage('Failed to delete FAQ');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading FAQs...</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-8 text-emerald-900">Manage FAQs</h1>

      {message && (
        <div className={`p-4 mb-6 rounded-lg ${
          message.includes('successfully') || message.includes('added') || message.includes('updated') || message.includes('deleted')
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {/* Form - Add / Edit */}
      <form onSubmit={handleAddOrUpdate} className="mb-12 bg-gray-50 p-6 rounded-lg border">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Question</label>
            <input
              name="question"
              value={form.question}
              onChange={handleInputChange}
              placeholder="e.g. What is the possession date?"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Answer</label>
            <textarea
              name="answer"
              value={form.answer}
              onChange={handleInputChange}
              rows={6}
              placeholder="Detailed answer..."
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Display Order</label>
            <input
              type="number"
              name="display_order"
              value={form.display_order}
              onChange={handleInputChange}
              placeholder="Lower number = appears first"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-emerald-600 text-white px-8 py-3 rounded hover:bg-emerald-700 disabled:opacity-60 font-medium"
          >
            {saving ? 'Saving...' : editingId ? 'Update FAQ' : 'Add New FAQ'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ question: '', answer: '', display_order: '' });
              }}
              className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* List of FAQs */}
      <div className="space-y-4">
        {faqs.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No FAQs yet. Add one above.</p>
        ) : (
          faqs.map((faq) => (
            <div 
              key={faq.id} 
              className="p-6 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-emerald-900">{faq.question}</h3>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="text-emerald-600 hover:text-emerald-800"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id, faq.question)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 whitespace-pre-line">{faq.answer}</p>
              <p className="text-sm text-gray-500 mt-3">
                Display order: {faq.display_order}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}