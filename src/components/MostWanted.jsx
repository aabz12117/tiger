import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MostWanted.css';
import { Skull, AlertTriangle } from 'lucide-react';
import { useAvatars } from '../hooks/useAvatars';
import { WANTED_LIST } from '../data/wantedList';

const MostWanted = () => {
    const { avatars, fetchAvatars } = useAvatars();
    const navigate = useNavigate();
    const [secretClicks, setSecretClicks] = useState(0);

    const handleSkullClick = () => {
        const newCount = secretClicks + 1;
        setSecretClicks(newCount);
        if (newCount >= 10) {
            navigate('/secret');
            setSecretClicks(0); // Reset for next time
        }
    };

    useEffect(() => {
        const userIds = WANTED_LIST.map(u => u.userId);
        fetchAvatars(userIds);
    }, [fetchAvatars]);

    return (
        <section className="most-wanted-section container">
            <div className="section-header centered">
                <Skull
                    size={32}
                    className="danger-icon"
                    onClick={handleSkullClick}
                    style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
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
