import { User, Shield, Hammer, Code, PenTool, ExternalLink, MessageCircle, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import '../styles/Creators.css';

const TEAM_MEMBERS = [
    {
        name: 'D7ooal',
        role: 'المالك والمؤسس',
        roleType: 'owner',
        userId: '3202017640',
        icon: <Shield size={24} />,
        link: 'https://www.roblox.com/users/3202017640/profile',
        discord: 'https://discord.gg/7a4UHZfUJW',
        social: null
    },
    {
        name: 'Bodi12012',
        role: 'كبير البنائين',
        roleType: 'builder',
        userId: 3969119603,
        icon: <Hammer size={24} />,
        link: 'https://www.roblox.com/ar/users/3969119603/profile',
        discord: 'https://discord.gg/7a4UHZfUJW',
        social: 'https://discord.gg/NfNrPvC'
    },
    {
        name: 'abod120120',
        role: 'مبرمج رئيسي',
        roleType: 'programmer',
        userId: '1233849028',
        icon: <Code size={24} />,
        link: 'https://www.roblox.com/users/1233849028/profile',
        discord: 'https://discord.gg/NfNrPvC',
        social: 'https://discord.gg/NfNrPvC'
    },
    {
        name: 'Sarax1000',
        role: 'الحلوه ساره',
        roleType: 'designer',
        userId: '1934759568',
        icon: <PenTool size={24} />,
        link: 'https://www.roblox.com/users/1934759568/profile',
        discord: 'https://discord.gg/7a4UHZfUJW',
        social: 'https://discord.gg/7a4UHZfUJW'
    }
];

import { useAvatars } from '../context/AvatarContext';

const Creators = () => {
    const { avatars, fetchAvatars } = useAvatars();

    useEffect(() => {
        const userIds = TEAM_MEMBERS.filter(m => m.userId).map(m => m.userId);
        fetchAvatars(userIds);
    }, [fetchAvatars]);

    return (
        <div className="creators-page container fade-in">
            <h1 className="page-title">فريق العمل</h1>

            <div className="creators-grid">
                {TEAM_MEMBERS.map((member, index) => (
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

                            <div className="social-links-container">
                                <a
                                    href={member.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="profile-link roblox"
                                    title="Roblox Profile"
                                >
                                    <ExternalLink size={14} />
                                    <span>روبلوكس</span>
                                </a>

                                {member.discord && (
                                    <a
                                        href={member.discord.startsWith('http') ? member.discord : '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="profile-link discord"
                                        title={member.discord.startsWith('http') ? "Discord Server" : `Discord: ${member.discord}`}
                                        onClick={(e) => {
                                            if (!member.discord.startsWith('http')) {
                                                e.preventDefault();
                                                navigator.clipboard.writeText(member.discord);
                                                alert(`تم نسخ حساب الديسكورد: ${member.discord}`);
                                            }
                                        }}
                                    >
                                        <MessageCircle size={14} />
                                        <span>{member.discord.startsWith('http') ? 'ديسكورد' : 'نسخ ID'}</span>
                                    </a>
                                )}

                                {member.social && member.social !== '#' && (
                                    <a
                                        href={member.social}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="profile-link web"
                                        title="Website / Social"
                                    >
                                        <Globe size={14} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Creators;
