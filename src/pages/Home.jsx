import { Play, Activity, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import '../styles/Home.css';

const Home = () => {
    const [playerCount, setPlayerCount] = useState(1240);

    // Simulate fluctuation in player count
    useEffect(() => {
        const interval = setInterval(() => {
            setPlayerCount(prev => prev + Math.floor(Math.random() * 10) - 4);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-page fade-in">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg-animate"></div>
                <div className="hero-content container">
                    <div className="hero-text">
                        <img src="/assets/logo.png" alt="Tiger City Logo" className="hero-logo" />
                        <h1 className="hero-title">تايقر سيتي</h1>
                        <p className="hero-description">
                            المدينة الأفضل في عالم روبلوكس. استمتع بحياة واقعية، وظائف متعددة،
                            ومجتمع راقٍ. انضم إلينا الآن!
                        </p>

                        <div className="hero-actions">
                            <a
                                href="https://www.roblox.com/ar/games/8446939114/unnamed"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="play-btn"
                            >
                                <Play fill="currentColor" />
                                <span>العب الآن</span>
                            </a>

                            <div className="status-indicator online glass-panel">
                                <span className="dot"></span>
                                <div className="status-text">
                                    <span className="count">{playerCount.toLocaleString()}</span>
                                    <span className="label">لاعب حالياً</span>
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
                            <img src="/assets/logo.png" alt="Tiger City Preview" className="preview-img" />
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
        </div>
    );
};

export default Home;
