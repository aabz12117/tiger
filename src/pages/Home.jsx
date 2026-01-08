import { Play, Activity, Calendar, Construction, PauseCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import '../styles/Home.css';
import MostWanted from '../components/MostWanted';

const Home = () => {
    const [playerCount, setPlayerCount] = useState(0);
    const [mapStatus, setMapStatus] = useState('شغال'); // Default to working

    useEffect(() => {
        const fetchPlayerCount = async () => {
            try {
                const response = await fetch('https://games.roproxy.com/v1/games?universeIds=3229704042');
                const data = await response.json();
                if (data && data.data && data.data[0]) {
                    setPlayerCount(data.data[0].playing);
                }
            } catch (error) {
                console.error('Error fetching player count:', error);
            }
        };

        // Real-time status from Firestore
        const unsub = onSnapshot(doc(db, "services", "main-game"), (doc) => {
            if (doc.exists()) {
                const status = doc.data().status;
                // Map Firestore status to Arabic strings used in UI
                if (status === 'online') setMapStatus('شغال');
                else if (status === 'maintenance') setMapStatus('صيانه');
                else if (status === 'offline') setMapStatus('موقف');
            }
        });

        fetchPlayerCount();
        const countInterval = setInterval(fetchPlayerCount, 10000);

        return () => {
            clearInterval(countInterval);
            unsub();
        };
    }, []);

    const getStatusInfo = () => {
        switch (mapStatus) {
            case 'صيانه':
                return {
                    label: 'تحت الصيانة',
                    icon: <Construction size={18} />,
                    class: 'maintenance',
                    btnText: 'تحت الصيانة',
                    btnClass: 'disabled-btn'
                };
            case 'موقف':
                return {
                    label: 'مغلق مؤقتاً',
                    icon: <PauseCircle size={18} />,
                    class: 'stopped',
                    btnText: 'مغلق',
                    btnClass: 'disabled-btn'
                };
            default:
                return {
                    label: 'شغال',
                    icon: <Activity size={18} />,
                    class: 'online',
                    btnText: 'العب الآن',
                    btnClass: ''
                };
        }
    };

    const statusInfo = getStatusInfo();

    return (
        <div className="home-page fade-in">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg-animate"></div>
                <div className="hero-content container">
                    <div className="hero-text">
                        <img src="assets/logo.png" alt="Tiger City Logo" className="hero-logo" />
                        <h1 className="hero-title">تايقر سيتي</h1>
                        <p className="hero-description">
                            المدينة الأفضل في عالم روبلوكس. استمتع بحياة واقعية، وظائف متعددة،
                            ومجتمع راقٍ. انضم إلينا الآن!
                        </p>

                        <div className="hero-actions">
                            <a
                                href={mapStatus === 'شغال' ? "https://www.roblox.com/ar/games/8446939114/unnamed" : "#"}
                                target={mapStatus === 'شغال' ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className={`play-btn ${statusInfo.btnClass}`}
                                onClick={(e) => mapStatus !== 'شغال' && e.preventDefault()}
                            >
                                {mapStatus === 'شغال' ? <Play fill="currentColor" /> : statusInfo.icon}
                                <span>{statusInfo.btnText}</span>
                            </a>

                            <div className={`status-indicator ${statusInfo.class} glass-panel`}>
                                <span className="dot"></span>
                                <div className="status-text">
                                    <span className="count">
                                        {mapStatus === 'شغال' ? playerCount.toLocaleString() : statusInfo.label}
                                    </span>
                                    <span className="label">
                                        {mapStatus === 'شغال' ? 'لاعب حالياً' : 'حالة الماب'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual">
                        {/* Placeholder for map screenshot/video */}
                        <div className="visual-card">
                            <div className="glow-effect"></div>
                            {/* We can use the logo again or a generate_image later if needed, 
                    but for now a nice CSS placeholder or the logo is fine */}
                            <img src="assets/logo.png" alt="Tiger City Preview" className="preview-img" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Update Section */}
            <section className="latest-update container">
                <div className="section-header">
                    <h2>آخر تحديث</h2>
                    <div className="update-meta">
                        <Calendar size={18} />
                        <span>29 ديسمبر 2025</span>
                    </div>
                </div>

                <div className="update-card glass-card">
                    <div className="update-content">
                        <h3>تحديث الشتاء الكبير v2.5</h3>
                        <p>
                            تم إضافة مناطق ثلجية جديدة، سيارات حصرية، ووظائف شتوية.
                            تحسينات على الأداء وإصلاح بعض الأخطاء.
                        </p>
                        <ul className="update-highlights">
                            <li>❄️ منطقة التزلج الجديدة</li>
                            <li>🚗 3 سيارات دفع رباعي</li>
                            <li>🧥 ملابس شتوية في المتجر</li>
                        </ul>
                    </div>
                    <div className="update-image">
                        {/* Update visual placeholder */}
                        <div className="placeholder-box glass-panel">صورة التحديث</div>
                    </div>
                </div>
            </section>
            {/* Most Wanted Section */}
            <MostWanted />
        </div>
    );
};

export default Home;
