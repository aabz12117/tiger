import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, ShieldAlert, Lock, Skull } from 'lucide-react';
import '../styles/Secret.css';

const Secret = () => {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const fullText = "WELCOME TO TIGER CITY DARK WEB... ACCESS GRANTED... DATA DECRYPTED...";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="secret-page">
            <div className="terminal-container">
                <div className="terminal-header">
                    <span><Terminal size={18} /> TIGER_OS v4.0.2</span>
                    <span>STATUS: ENCRYPTED</span>
                </div>

                <div className="secret-content">
                    <h1 className="glitch-text-green">{text}</h1>

                    <section style={{ marginTop: '40px' }}>
                        <h2><Skull size={20} /> ملفات العصابات السرية</h2>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>العصابة</th>
                                    <th>المستوى</th>
                                    <th>المقر السري</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>التنانين السوداء</td>
                                    <td>خطر جداً</td>
                                    <td>تحت نفق المدينة القديم</td>
                                </tr>
                                <tr>
                                    <td>عصابة النمر</td>
                                    <td>سري للغاية</td>
                                    <td>خلف مستودعات الميناء</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section style={{ marginTop: '30px' }}>
                        <h2><Lock size={20} /> تسريبات التحديث القادم</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li>[✓] نظام تجارة الأسلحة المتقدم - قيد التجربة</li>
                            <li>[✓] خريطة توسعة الشمال - 85% مكتملة</li>
                            <li>[!] مهمة "السطو الكبير" - قريباً جداً</li>
                            <li>[?] مكافآت اللاعبين القدامى - جاري التحضير</li>
                        </ul>
                    </section>

                    <div className="warning-box">
                        <ShieldAlert size={24} /> تنبيه: أي تسريب لهذه المعلومات سيعرضك للنفي من المدينة
                    </div>

                    <button className="back-btn-terminal" onClick={() => navigate('/')}>
                        الخروج من النظام الآمن
                    </button>
                </div>
            </div>

            <div className="matrix-bg">
                {Array(20).fill(0).map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        left: `${i * 5}%`,
                        top: Math.random() * 100 + '%',
                        animation: `fall ${Math.random() * 5 + 2}s linear infinite`
                    }}>
                        {Math.random().toString(36).substring(2, 7)}
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes fall {
                    from { transform: translateY(-100vh); }
                    to { transform: translateY(100vh); }
                }
            `}</style>
        </div>
    );
};

export default Secret;
