import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Shield, Check, AlertTriangle, XCircle, Server } from 'lucide-react';
import '../styles/Home.css'; // Re-use home styles for consistency

const StatusPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(q, (snapshot) => {
            const servicesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setServices(servicesData);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const getStatusConfig = (status) => {
        switch (status) {
            case 'online': return { color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: Check, label: 'Operational' };
            case 'maintenance': return { color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: AlertTriangle, label: 'Maintenance' };
            case 'offline': return { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: XCircle, label: 'Offline' };
            default: return { color: 'text-gray-500', bg: 'bg-gray-500/10', border: 'border-gray-500/20', icon: Shield, label: 'Unknown' };
        }
    };

    return (
        <div className="home-page pt-24 min-h-screen">
            <div className="container">
                <div className="text-center mb-12 fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4">
                        <Server className="text-[#FFD700]" size={40} />
                        <span className="text-white">حالة الخدمات</span>
                    </h1>
                    <p className="text-gray-400 text-lg">متابعة حية لحالة جميع خدمات وسيرفرات تايقر سيتي</p>
                </div>

                <div className="grid gap-4 max-w-3xl mx-auto fade-in">
                    {loading ? (
                        <div className="text-center text-white p-8">جاري التحميل...</div>
                    ) : (
                        services.map((service) => {
                            const config = getStatusConfig(service.status);
                            const Icon = config.icon;
                            return (
                                <div key={service.id} className={`glass-card p-6 rounded-xl border flex items-center justify-between ${config.border} ${config.bg} transition-all hover:scale-[1.01]`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-full bg-black/40 ${config.color}`}>
                                            <Icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{service.name}</h3>
                                            <p className="text-gray-400 text-sm font-mono opacity-60">ID: {service.id}</p>
                                        </div>
                                    </div>
                                    <div className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider ${config.color} bg-black/20`}>
                                        {config.label}
                                    </div>
                                </div>
                            );
                        })
                    )}

                    {!loading && services.length === 0 && (
                        <div className="text-center text-gray-500 p-8 glass-card">
                            لم يتم العثور على خدمات مسجلة.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatusPage;
