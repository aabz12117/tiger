import { User, Shield, Hammer, Code, PenTool, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import '../styles/Creators.css';

const Creators = () => {
    const [avatars, setAvatars] = useState({});

    const team = [
        {
            name: 'D7ooal',
            role: 'المالك والمؤسس',
            roleType: 'owner',
            userId: '3202017640',
            icon: <Shield size={24} />,
            link: 'https://www.roblox.com/users/3202017640/profile'
        },
        {
            name: 'BuilderPro',
            role: 'كبير البنائين',
            roleType: 'builder',
            userId: null,
            icon: <Hammer size={24} />,
            link: '#'
        },
        {
            name: 'abod120120',
            role: 'مبرمج رئيسي',
            roleType: 'programmer',
            userId: '1233849028',
            icon: <Code size={24} />,
            link: 'https://www.roblox.com/users/1233849028/profile'
        },
        {
            name: 'ArtisticSoul',
            role: 'مصمم جرافيك',
            roleType: 'designer',
            userId: null,
            icon: <PenTool size={24} />,
            link: '#'
        }
    ];

    useEffect(() => {
        const fetchAvatars = async () => {
            const userIds = team.filter(m => m.userId).map(m => m.userId).join(',');
            if (!userIds) return;

            try {
                // Using a proxy or direct call if CORS allows. Roblox API usually has CORS.
                // If this fails due to CORS in development, we might need a proxy or just fallback.
                // For now, attempting direct call which might fail in browser.
                // Alternative: Use a public CORS proxy or just the image redirection URL if it still works.
                // Let's try the direct image URL which redirects (it's an image src, so no CORS issue for <img> tag usually, 
                // but the endpoint returns 404 sometimes if not valid).

                // Better approach for reliability without backend: 
                // Use the known thumbnail CDN pattern if possible, but that hash changes.
                // We will try the API. If it fails, we fall back to a placeholder.

                const targetUrl = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userIds}&size=420x420&format=Png&isCircular=false`;
                const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
                const proxyData = await response.json();
                const data = JSON.parse(proxyData.contents);

                const avatarMap = {};
                if (data.data) {
                    data.data.forEach(item => {
                        avatarMap[item.targetId] = item.imageUrl;
                    });
                    setAvatars(avatarMap);
                }
            } catch (error) {
                console.error("Failed to fetch avatars:", error);
            }
        };

        fetchAvatars();
    }, []);

    return (
        <div className="creators-page container fade-in">
            <h1 className="page-title">فريق العمل</h1>

            <div className="creators-grid">
                {team.map((member, index) => (
                    <div key={index} className={`creator-card glass-card ${member.roleType}`}>
                        <div className="avatar-container">
                            {member.userId && avatars[member.userId] ? (
                                <img
                                    src={avatars[member.userId]}
                                    alt={member.name}
                                    className="avatar-img"
                                />
                            ) : (
                                <div className="avatar-placeholder">
                                    <User size={60} />
                                </div>
                            )}
                        </div>

                        <div className="member-info">
                            <div className="role-badge">
                                {member.icon}
                                <span>{member.role}</span>
                            </div>
                            <h2>{member.name}</h2>

                            <a
                                href={member.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="profile-link"
                            >
                                <span>حساب روبلوكس</span>
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Creators;
