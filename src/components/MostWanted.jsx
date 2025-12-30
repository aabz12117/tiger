import { useState, useEffect } from 'react';
import '../styles/MostWanted.css';
import { Skull, AlertTriangle } from 'lucide-react';

import { WANTED_LIST } from '../data/wantedList';

const MostWanted = () => {


    const [avatars, setAvatars] = useState({});

    useEffect(() => {
        const fetchAvatars = async () => {
            const userIds = WANTED_LIST.map(u => u.userId).join(',');
            try {
                const targetUrl = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userIds}&size=420x420&format=Png&isCircular=false`;
                const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
                const proxyData = await response.json();
                const data = JSON.parse(proxyData.contents);

                const map = {};
                if (data.data) {
                    data.data.forEach(item => {
                        map[item.targetId] = item.imageUrl;
                    });
                    setAvatars(map);
                }
            } catch (err) {
                console.error("Failed to fetch wanted avatars", err);
            }
        };

        fetchAvatars();
    }, []);

    return (
        <section className="most-wanted-section container">
            <div className="section-header centered">
                <Skull size={32} className="danger-icon" />
                <h2 className="glitch-text" data-text="قائمة المطلوبين">قائمة المطلوبين</h2>
                <p className="subtitle">للعدالة في تايقر سيتي</p>
            </div>

            <div className="wanted-grid">
                {WANTED_LIST.map((player, index) => (
                    <div key={index} className="wanted-poster">
                        <div className="poster-header">
                            <span>WANTED</span>
                        </div>
                        <div className="poster-image">
                            {avatars[player.userId] ? (
                                <img src={avatars[player.userId]} alt={player.name} />
                            ) : (
                                <div className="placeholder-wanted">?</div>
                            )}
                            <div className="stamp">مطلوب</div>
                        </div>
                        <div className="poster-info">
                            <h3>{player.name}</h3>
                            <p className="crime">{player.reason}</p>
                            <div className="bounty">
                                <AlertTriangle size={16} />
                                <span>{player.bounty}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MostWanted;
