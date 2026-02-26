import { useEffect, useState } from 'react';
import { contentAPI } from '../../api/api';
import { 
  Dumbbell, Baby, Map, PersonStanding, 
  Utensils, Coffee, Wifi, Shield, 
  Car, Trees, Building, HeartPulse, 
  Bath, Bed, Home, Plus, Trash2 
} from 'lucide-react';

export default function EditAmenities() {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    loadAmenities();
  }, []);

  const loadAmenities = async () => {
    try {
      const res = await contentAPI.getAmenities();
      setAmenities(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMessage('Failed to load amenities');
      setLoading(false);
    }
  };

  // Automatic icon mapping based on title keywords
  const getIconForTitle = (title) => {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes('gym') || lowerTitle.includes('fitness')) return <Dumbbell size={20} />;
    if (lowerTitle.includes('kid') || lowerTitle.includes('play') || lowerTitle.includes('child')) return <Baby size={20} />;
    if (lowerTitle.includes('jog') || lowerTitle.includes('run') || lowerTitle.includes('track')) return <Map size={20} />;
    if (lowerTitle.includes('yoga') || lowerTitle.includes('meditation')) return <PersonStanding size={20} />;
    if (lowerTitle.includes('pool') || lowerTitle.includes('swim')) return <Bath size={20} />;
    if (lowerTitle.includes('park') || lowerTitle.includes('garden') || lowerTitle.includes('green')) return <Trees size={20} />;
    if (lowerTitle.includes('security') || lowerTitle.includes('guard')) return <Shield size={20} />;
    if (lowerTitle.includes('parking') || lowerTitle.includes('car')) return <Car size={20} />;
    if (lowerTitle.includes('club') || lowerTitle.includes('house') || lowerTitle.includes('community')) return <Building size={20} />;
    if (lowerTitle.includes('spa') || lowerTitle.includes('massage') || lowerTitle.includes('wellness')) return <HeartPulse size={20} />;
    if (lowerTitle.includes('cafe') || lowerTitle.includes('coffee') || lowerTitle.includes('dining')) return <Coffee size={20} />;
    if (lowerTitle.includes('wifi') || lowerTitle.includes('internet')) return <Wifi size={20} />;
    if (lowerTitle.includes('restaurant') || lowerTitle.includes('food')) return <Utensils size={20} />;

    // Default fallback icon
    return <Home size={20} />;
  };

  const handleAdd = async () => {
    if (!newTitle.trim()) return;

    setSaving(true);
    try {
      const res = await contentAPI.createAmenity({ 
        title: newTitle.trim(), 
        display_order: amenities.length + 1 
      });
      setAmenities([...amenities, res.data]);
      setNewTitle('');
      setMessage(`Amenity "${newTitle.trim()}" added successfully`);
    } catch (err) {
      setMessage('Failed to add amenity');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id, title) => {
    if (!title.trim()) return;

    setSaving(true);
    try {
      await contentAPI.updateAmenity(id, { title });
      setAmenities(amenities.map(a => a.id === id ? { ...a, title } : a));
      setMessage(`Amenity updated to "${title}"`);
    } catch (err) {
      setMessage('Failed to update amenity');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;

    setSaving(true);
    try {
      await contentAPI.deleteAmenity(id);
      setAmenities(amenities.filter(a => a.id !== id));
      setMessage(`Amenity "${title}" deleted successfully`);
    } catch (err) {
      setMessage('Failed to delete amenity');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading amenities...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-8 text-emerald-900">Manage Amenities</h1>

      {message && (
        <div className={`p-4 mb-6 rounded-lg ${
          message.includes('successfully') || message.includes('added') || message.includes('updated') || message.includes('deleted')
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {/* Add new amenity */}
      <div className="mb-10 flex gap-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New amenity title (e.g. Gymnasium, Swimming Pool)"
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={handleAdd}
          disabled={saving || !newTitle.trim()}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-60 flex items-center gap-2 font-medium"
        >
          <Plus size={18} />
          Add Amenity
        </button>
      </div>

      {/* List of amenities */}
      <div className="space-y-4">
        {amenities.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No amenities found. Add one above.</p>
        ) : (
          amenities.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  {getIconForTitle(item.title)}
                </div>
                <input
                  type="text"
                  defaultValue={item.title}
                  onBlur={(e) => {
                    if (e.target.value.trim() !== item.title.trim()) {
                      handleUpdate(item.id, e.target.value.trim());
                    }
                  }}
                  className="flex-1 bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none px-2 py-1 text-lg font-medium"
                />
              </div>

              <button
                onClick={() => handleDelete(item.id, item.title)}
                className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition-colors"
                title="Delete amenity"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}