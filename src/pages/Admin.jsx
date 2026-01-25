import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, updateDoc, setDoc } from 'firebase/firestore';
import { Shield, Lock, Activity, Check, AlertTriangle, XCircle, Save, Plus } from 'lucide-react';
import '../styles/Admin.css';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    // Local state to track edits before saving
    const [edits, setEdits] = useState({});

    // Hardcoded password for simplicity as per plan
    const ADMIN_PASS = "tiger123";

    useEffect(() => {
        if (!isLoggedIn) return;

        const unsub = onSnapshot(collection(db, "services"), (snapshot) => {
            const servicesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Sort so "main-game" is always first if it exists
            servicesData.sort((a, b) => {
                if (a.id === 'main-game') return -1;
                if (b.id === 'main-game') return 1;
                return 0;
            });

            setServices(servicesData);
            setLoading(false);
        });
        return () => unsub();
    }, [isLoggedIn]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASS) {
            setIsLoggedIn(true);
        } else {
            alert("كلمة الدخول خاطئة!");
        }
    };

    const handleStatusChange = (serviceId, newStatus) => {
        setEdits(prev => ({
            ...prev,
            [serviceId]: {
                ...prev[serviceId],
                status: newStatus
            }
        }));
    };

    const handleMessageChange = (serviceId, newMessage) => {
        setEdits(prev => ({
            ...prev,
            [serviceId]: {
                ...prev[serviceId],
                message: newMessage
            }
        }));
    };

    const saveChanges = async (serviceId) => {
        const changes = edits[serviceId];
        if (!changes) return;

        const docRef = doc(db, "services", serviceId);
        try {
            await updateDoc(docRef, {
                ...changes,
                updatedAt: new Date()
            });

            // Clear edits for this item
            const newEdits = { ...edits };
            delete newEdits[serviceId];
            setEdits(newEdits);

            alert("تم تحديث الحالة بنجاح!");
        } catch (error) {
            console.error("Error updating document: ", error);
            alert("حدث خطأ أثناء التحديث.");
        }
    };

    const initializeDefaults = async () => {
        // Helper to create default entry if empty
        const docRef = doc(db, "services", "main-game");
        await setDoc(docRef, {
            name: "سيرفر تايقر سيتي",
            status: "online",
            message: "",
            updatedAt: new Date(),
            createdAt: new Date()
        }, { merge: true });
        alert("تم إنشاء البيانات الافتراضية.");
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-page flex items-center justify-center">
                <div className="login-container glass-card fade-in">
                    <Shield size={48} className="mx-auto mb-4 text-[#ffd700]" />
                    <h2 className="text-2xl font-bold mb-6">لوحة التحكم</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="login-btn">دخول</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="container">
                <div className="admin-header fade-in">
                    <div className="flex items-center gap-3">
                        <Lock className="text-[#ffd700]" />
                        <h1 className="text-2xl font-bold">لوحة تحكم المشرفين</h1>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={initializeDefaults} className="text-xs text-gray-400 hover:text-white border border-gray-600 px-3 py-1 rounded">
                            إصلاح البيانات
                        </button>
                        <button onClick={() => setIsLoggedIn(false)} className="bg-red-500/20 text-red-500 px-4 py-2 rounded font-bold hover:bg-red-500 hover:text-white transition">
                            تسجيل خروج
                        </button>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto">
                    {loading ? (
                        <p className="text-center">جاري تحميل البيانات...</p>
                    ) : (
                        services.map(service => {
                            const editData = edits[service.id] || {};
                            const currentStatus = editData.status || service.status;
                            const currentMessage = editData.message !== undefined ? editData.message : (service.message || "");
                            const hasChanges = editData.status || editData.message !== undefined;

                            return (
                                <div key={service.id} className="service-card-admin fade-in">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold">{service.name}</h3>
                                            <span className="text-sm text-gray-500 opacity-60">ID: {service.id}</span>
                                        </div>
                                        {hasChanges && (
                                            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">تغييرات غير محفوظة</span>
                                        )}
                                    </div>

                                    <div className="status-controls">
                                        <button
                                            className={`status-btn online ${currentStatus === 'online' ? 'active' : ''}`}
                                            onClick={() => handleStatusChange(service.id, 'online')}
                                        >
                                            <Check size={18} /> متصل
                                        </button>
                                        <button
                                            className={`status-btn maintenance ${currentStatus === 'maintenance' ? 'active' : ''}`}
                                            onClick={() => handleStatusChange(service.id, 'maintenance')}
                                        >
                                            <AlertTriangle size={18} /> صيانة
                                        </button>
                                        <button
                                            className={`status-btn offline ${currentStatus === 'offline' ? 'active' : ''}`}
                                            onClick={() => handleStatusChange(service.id, 'offline')}
                                        >
                                            <XCircle size={18} /> متوقف
                                        </button>
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-sm text-gray-400 block mb-1">رسالة مخصصة (اختياري)</label>
                                        <input
                                            type="text"
                                            className="message-input"
                                            placeholder="مثلاً: صيانة لمدة ساعة..."
                                            value={currentMessage}
                                            onChange={(e) => handleMessageChange(service.id, e.target.value)}
                                        />
                                    </div>

                                    <div className="flex justify-end mt-2">
                                        <button
                                            className="update-btn flex items-center gap-2"
                                            disabled={!hasChanges}
                                            onClick={() => saveChanges(service.id)}
                                        >
                                            <Save size={16} /> حفظ التغييرات
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}

                    {!loading && services.length === 0 && (
                        <div className="text-center py-10">
                            <p className="mb-4">لا توجد خدمات مسجلة.</p>
                            <button onClick={initializeDefaults} className="login-btn max-w-xs mx-auto">
                                <Plus size={18} className="inline mr-2" /> إنشاء الخدمة الأساسية
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
