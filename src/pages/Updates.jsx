import '../styles/Updates.css';
import { CloudSun, Flame, AlertCircle, Car, TrendingUp, ShieldAlert, Newspaper as NewsIcon } from 'lucide-react';
import { getDailyContent } from '../data/dailyContent';
import { useState, useEffect } from 'react';

import { useAvatars } from '../hooks/useAvatars';

const Updates = () => {
    const [content] = useState(() => getDailyContent());
    const { avatars, fetchAvatars } = useAvatars();

    useEffect(() => {
        if (content?.criminal?.userId) {
            fetchAvatars(content.criminal.userId);
        }
    }, [content, fetchAvatars]);

    if (!content) return <div className="loading-spinner">جاري تحميل الصحيفة...</div>;

    const getIconForCategory = (cat) => {
        if (cat === 'اقتصاد') return <TrendingUp size={20} color="#00c3ff" />;
        if (cat === 'حوادث') return <Flame size={20} color="#ff4d4d" />;
        if (cat === 'أمن' || cat === 'جنايات') return <ShieldAlert size={20} color="#d32f2f" />;
        if (cat === 'سيارات') return <Car size={20} color="#f9a825" />;
        return <NewsIcon size={20} color="#aaa" />;
    };

    return (
        <div className="newspaper-page fade-in">
            <header className="newspaper-header container">
                <div className="header-meta">
                    <span className="issue-date">{content.date}</span>
                    <span className="issue-number">العدد: {content.issueNo}</span>
                    <div className="weather-widget">
                        <CloudSun size={18} />
                        <span>24°C مشمس</span>
                    </div>
                </div>
                <h1 className="newspaper-title">Tiger Daily</h1>
                <div className="header-separator">
                    <span>الحقيقة . السرعة . التميز</span>
                </div>
            </header>

            <main className="newspaper-content container">
                {/* Main Headline */}
                <div className="main-headline">
                    <div className="headline-image">
                        <div className={`placeholder-news main ${content.main.type}`}>
                            <span>صورة الخبر</span>
                        </div>
                        <span className={`category-tag ${content.main.type === 'urgent' ? 'urgent' : ''}`}>
                            {content.main.category}
                        </span>
                    </div>
                    <div className="headline-text">
                        <h2>{content.main.headline}</h2>
                        <p className="lead-text">{content.main.lead}</p>
                        <p className="article-body">
                            {content.main.body}
                        </p>
                    </div>
                </div>

                <div className="newspaper-grid">
                    {/* Side Column */}
                    <div className="side-column">
                        <div className="news-card">
                            <div className="card-icon">{getIconForCategory(content.side1.category)}</div>
                            <h3>{content.side1.headline}</h3>
                            <p>{content.side1.lead}</p>
                        </div>
                        <div className="news-card">
                            <div className="card-icon">{getIconForCategory(content.side2.category)}</div>
                            <h3>{content.side2.headline}</h3>
                            <p>{content.side2.lead}</p>
                        </div>
                    </div>

                    {/* Center Column (Static or Extra feature) */}
                    <div className="center-column">
                        <div className="feature-article">
                            <h3>أخبار متفرقة</h3>
                            <div className="placeholder-news feature">إعلان مميز</div>
                            <p>
                                تابعونا يومياً لمعرفة آخر أخبار المدينة، التخفيضات، والفعاليات.
                                صحيفة تايقر ديلي هي صوت المواطن.
                            </p>
                        </div>
                    </div>

                    {/* Ads & Wanted */}
                    <div className="ads-column">
                        <div className="ad-box">
                            <h4>إعلان</h4>
                            <p>انضم لشرطة تايقر سيتي الآن! رواتب مجزية ومكافآت يومية.</p>
                            <button className="ad-btn">قدم الآن</button>
                        </div>

                        <div className="wanted-mini">
                            <div className="wanted-header">
                                <AlertCircle size={20} />
                                <h4>مجرم اليوم</h4>
                            </div>

                            {avatars[content.criminal.userId] ? (
                                <div className="wanted-avatar-container">
                                    <img src={avatars[content.criminal.userId]} alt={content.criminal.name} className="wanted-avatar" />
                                </div>
                            ) : (
                                <div className="wanted-placeholder">?</div>
                            )}

                            <p className="wanted-name">{content.criminal.name}</p>
                            <div className="wanted-details">
                                <span>التهمة: {content.criminal.crime}</span>
                                <span className="wanted-bounty">{content.criminal.bounty}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Updates;
