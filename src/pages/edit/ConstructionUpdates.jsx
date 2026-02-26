import { useEffect, useState } from 'react';
import { contentAPI } from '../../api/api';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function EditConstructionUpdates() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Form fields for adding/editing
  const [form, setForm] = useState({
    title: '',
    status: '',
    description: '',
    display_order: ''
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadUpdates();
  }, []);

  const loadUpdates = async () => {
    try {
      const res = await contentAPI.getConstructionUpdates();
      setUpdates(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMessage('Failed to load updates');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    setSaving(true);
    setMessage('');

    try {
      if (editingId) {
        // Update
        await contentAPI.updateConstructionUpdate(editingId, form);
        setMessage(`Update "${form.title}" updated successfully`);
        setUpdates(updates.map(u => u.id === editingId ? { ...u, ...form } : u));
        setEditingId(null);
      } else {
        // Create
        const res = await contentAPI.createConstructionUpdate({
          ...form,
          display_order: form.display_order || updates.length + 1
        });
        setUpdates([...updates, res.data]);
        setMessage(`New update "${form.title}" added`);
      }

      // Reset form
      setForm({ title: '', status: '', description: '', display_order: '' });
    } catch (err) {
      setMessage('Failed to save update');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title || '',
      status: item.status || '',
      description: item.description || '',
      display_order: item.display_order || ''
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;

    setSaving(true);
    try {
      await contentAPI.deleteConstructionUpdate(id);
      setUpdates(updates.filter(u => u.id !== id));
      setMessage(`Update "${title}" deleted`);
      if (editingId === id) {
        setEditingId(null);
        setForm({ title: '', status: '', description: '', display_order: '' });
      }
    } catch (err) {
      setMessage('Failed to delete update');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading updates...</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-8 text-emerald-900">
        Manage Construction Updates
      </h1>

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
          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleInputChange}
              placeholder="e.g. Foundation Work Completed"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Status</label>
            <input
              name="status"
              value={form.status}
              onChange={handleInputChange}
              placeholder="e.g. Phase 1 - Completed"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Detailed update description..."
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Display Order</label>
            <input
              type="number"
              name="display_order"
              value={form.display_order}
              onChange={handleInputChange}
              placeholder="Lower number = higher position"
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
            {saving ? 'Saving...' : editingId ? 'Update Update' : 'Add New Update'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ title: '', status: '', description: '', display_order: '' });
              }}
              className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* List of updates */}
      <div className="space-y-4">
        {updates.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No construction updates yet. Add one above.</p>
        ) : (
          updates.map((update) => (
            <div 
              key={update.id} 
              className="p-6 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-emerald-900">{update.title}</h3>
                  {update.status && (
                    <span className="inline-block px-3 py-1 mt-2 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                      {update.status}
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(update)}
                    className="text-emerald-600 hover:text-emerald-800"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(update.id, update.title)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <p className="text-gray-700">{update.description || 'No description'}</p>
              <p className="text-sm text-gray-500 mt-2">
                Display order: {update.display_order}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}