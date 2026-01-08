import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, doc, onSnapshot, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Shield, Check, AlertTriangle, XCircle, Loader, Plus, Trash2 } from 'lucide-react';

const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [services, setServices] = useState([]);
    const [newServiceName, setNewServiceName] = useState('');
    const [loading, setLoading] = useState(false);

    const ACCESS_CODE = "tiger123";

    useEffect(() => {
        if (isAuthenticated) {
            const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
            const unsub = onSnapshot(q, (snapshot) => {
                const servicesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setServices(servicesData);
            });
            return () => unsub();
        }
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ACCESS_CODE) {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect Access Code");
        }
    };

    const addService = async (e) => {
        e.preventDefault();
        if (!newServiceName.trim()) return;
        setLoading(true);
        try {
            // Create a document with the name as ID for easier lookup, or random ID
            const id = newServiceName.toLowerCase().replace(/\s+/g, '-');
            await setDoc(doc(db, "services", id), {
                name: newServiceName,
                status: 'online', // Default
                message: '',
                createdAt: new Date().toISOString()
            });
            setNewServiceName('');
        } catch (error) {
            console.error("Error adding service:", error);
            alert("Failed to add service");
        }
        setLoading(false);
    };

    const updateServiceStatus = async (serviceId, newStatus) => {
        try {
            await setDoc(doc(db, "services", serviceId), { status: newStatus }, { merge: true });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const deleteService = async (serviceId) => {
        if (!window.confirm("Are you sure you want to delete this service?")) return;
        try {
            await deleteDoc(doc(db, "services", serviceId));
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-gray-900 border border-gray-800 p-8 rounded-xl max-w-sm w-full space-y-4">
                    <div className="flex justify-center mb-4">
                        <Shield className="w-12 h-12 text-[#FFD700]" />
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">Tiger Admin</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Access Code"
                        className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-[#FFD700] outline-none transition"
                    />
                    <button type="submit" className="w-full bg-[#FFD700] text-black font-bold py-3 rounded hover:bg-yellow-400 transition">
                        Access Control Panel
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Shield className="text-[#FFD700]" />
                    System Control Center
                </h1>

                {/* Add New Service */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-400">Add New Service / Place</h2>
                    <form onSubmit={addService} className="flex gap-4">
                        <input
                            type="text"
                            value={newServiceName}
                            onChange={(e) => setNewServiceName(e.target.value)}
                            placeholder="e.g. Main Game, Police Station, Discord Bot..."
                            className="flex-1 bg-black border border-gray-700 p-3 rounded text-white focus:border-[#FFD700] outline-none"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#FFD700] text-black px-6 py-3 rounded font-bold hover:bg-yellow-400 transition flex items-center gap-2"
                        >
                            {loading ? <Loader className="animate-spin" /> : <Plus size={20} />}
                            Add
                        </button>
                    </form>
                </div>

                {/* Services List */}
                <div className="grid grid-cols-1 gap-4">
                    {services.map((service) => (
                        <div key={service.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4 min-w-[200px]">
                                <div className="p-3 bg-gray-800 rounded-lg">
                                    <Shield className="text-[#FFD700]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{service.name}</h3>
                                    <p className="text-xs text-gray-500 font-mono">ID: {service.id}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 bg-black p-1 rounded-lg border border-gray-800">
                                <button
                                    onClick={() => updateServiceStatus(service.id, 'online')}
                                    className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${service.status === 'online' ? 'bg-green-500 text-black font-bold' : 'text-gray-500 hover:text-white'
                                        }`}
                                >
                                    <Check size={16} /> Online
                                </button>
                                <button
                                    onClick={() => updateServiceStatus(service.id, 'maintenance')}
                                    className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${service.status === 'maintenance' ? 'bg-orange-500 text-black font-bold' : 'text-gray-500 hover:text-white'
                                        }`}
                                >
                                    <AlertTriangle size={16} /> Maintenance
                                </button>
                                <button
                                    onClick={() => updateServiceStatus(service.id, 'offline')}
                                    className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${service.status === 'offline' ? 'bg-red-500 text-black font-bold' : 'text-gray-500 hover:text-white'
                                        }`}
                                >
                                    <XCircle size={16} /> Offline
                                </button>
                            </div>

                            <button
                                onClick={() => deleteService(service.id)}
                                className="text-gray-600 hover:text-red-500 transition p-2"
                                title="Delete Service"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}

                    {services.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No services found. Add one above to get started.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
