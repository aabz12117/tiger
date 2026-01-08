import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatusBanner = () => {
    const [statusData, setStatusData] = useState(null);

    useEffect(() => {
        // Listening to the specific 'main-game' service for the global banner
        // You could also query for *any* service that is down if preferred
        const unsub = onSnapshot(doc(db, "services", "main-game"), (doc) => {
            if (doc.exists()) {
                setStatusData(doc.data());
            }
        });
        return () => unsub();
    }, []);

    if (!statusData) return null;

    const getStatusStyles = (status) => {
        switch (status) {
            case 'online':
                return { color: 'bg-green-500/10 text-green-500 border-green-500/20', icon: CheckCircle, label: 'Operational' };
            case 'maintenance':
                return { color: 'bg-orange-500/10 text-orange-500 border-orange-500/20', icon: AlertTriangle, label: 'Maintenance Active' };
            case 'offline':
                return { color: 'bg-red-500/10 text-red-500 border-red-500/20', icon: XCircle, label: 'Systems Offline' };
            default:
                return { color: 'bg-gray-500/10 text-gray-500', icon: CheckCircle, label: 'Unknown' };
        }
    };

    const style = getStatusStyles(statusData.status);
    const Icon = style.icon;

    // Only show if there's an issue OR if there's a specific message
    // If it's just 'online' with no message, don't clutter the header
    if (statusData.status === 'online' && !statusData.message) return null;

    return (
        <div className={`w-full py-2 px-4 backdrop-blur-md border-b flex items-center justify-center gap-2 ${style.color}`}>
            <Icon className="w-4 h-4" />
            <span className="font-bold text-sm tracking-widest uppercase truncate max-w-lg">
                {statusData.message || `${statusData.name || 'System'}: ${style.label}`}
            </span>
            <Link to="/status" className="text-xs underline opacity-70 hover:opacity-100 ml-2">
                View All
            </Link>
        </div>
    );
};

export default StatusBanner;
