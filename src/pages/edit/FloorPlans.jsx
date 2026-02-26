import { useEffect, useState } from 'react';
import { contentAPI } from '../../api/api';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function EditFloorPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Form fields
  const [form, setForm] = useState({
    plan_type: '',
    area: '',
    price_info: '',
    display_order: ''
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const res = await contentAPI.getFloorPlans();
      setPlans(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMessage('Failed to load floor plans');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!form.plan_type.trim()) {
      setMessage('Plan type is required');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      if (editingId) {
        // Update
        await contentAPI.updateFloorPlan(editingId, form);
        setMessage(`Floor plan updated successfully`);
        setPlans(plans.map(p => p.id === editingId ? { ...p, ...form } : p));
        setEditingId(null);
      } else {
        // Create
        const res = await contentAPI.createFloorPlan({
          ...form,
          display_order: form.display_order || plans.length + 1
        });
        setPlans([...plans, res.data]);
        setMessage(`New floor plan added`);
      }

      // Reset form
      setForm({ plan_type: '', area: '', price_info: '', display_order: '' });
    } catch (err) {
      setMessage('Failed to save floor plan');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (plan) => {
    setForm({
      plan_type: plan.plan_type || '',
      area: plan.area || '',
      price_info: plan.price_info || '',
      display_order: plan.display_order || ''
    });
    setEditingId(plan.id);
  };

  const handleDelete = async (id, plan_type) => {
    if (!window.confirm(`Delete "${plan_type}" floor plan?`)) return;

    setSaving(true);
    try {
      await contentAPI.deleteFloorPlan(id);
      setPlans(plans.filter(p => p.id !== id));
      setMessage(`Floor plan "${plan_type}" deleted`);
      if (editingId === id) {
        setEditingId(null);
        setForm({ plan_type: '', area: '', price_info: '', display_order: '' });
      }
    } catch (err) {
      setMessage('Failed to delete floor plan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading floor plans...</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-8 text-emerald-900">Manage Floor Plans</h1>

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
            <label className="block mb-2 font-medium">Plan Type</label>
            <input
              name="plan_type"
              value={form.plan_type}
              onChange={handleInputChange}
              placeholder="e.g. 1 BHK"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Area</label>
            <input
              name="area"
              value={form.area}
              onChange={handleInputChange}
              placeholder="e.g. 380-411 Sq.ft"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Price Info</label>
            <input
              name="price_info"
              value={form.price_info}
              onChange={handleInputChange}
              placeholder="e.g. Click for price"
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
              placeholder="Lower = higher position"
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
            {saving ? 'Saving...' : editingId ? 'Update Floor Plan' : 'Add New Floor Plan'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ plan_type: '', area: '', price_info: '', display_order: '' });
              }}
              className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* List of floor plans */}
      <div className="space-y-4">
        {plans.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No floor plans yet. Add one above.</p>
        ) : (
          plans.map((plan) => (
            <div 
              key={plan.id} 
              className="p-6 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-emerald-900">{plan.plan_type}</h3>
                  <p className="text-gray-700 mt-1">{plan.area || 'Area not specified'}</p>
                  <p className="text-emerald-700 font-medium mt-1">{plan.price_info || 'Price on request'}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="text-emerald-600 hover:text-emerald-800"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id, plan.plan_type)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Display order: {plan.display_order}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}