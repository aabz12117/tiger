import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, ShieldAlert, Lock, Skull, Cpu, Database, Wifi, EyeOff } from 'lucide-react';
import '../styles/Secret.css';

const Secret = () => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const logsEndRef = useRef(null);
    const [command, setCommand] = useState('');
    const [logs, setLogs] = useState([
        'TIGER_OS v4.0.2 INITIALIZING...',
        'BYPASSING SECURITY PROTOCOLS...',
        'DECRYPTING DARK WEB GATEWAY...',
        'ACCESS GRANTED. WELCOME, OPERATOR.'
    ]);

    // Auto-scroll logs
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    // Matrix Rain Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$@#%&*';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0f0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = command.toLowerCase().trim();
            let response = `COMMAND NOT FOUND: ${cmd}`;

            if (cmd === 'help') response = 'AVAILABLE: GANGS, LEAKS, STATUS, CLEAR, EXIT';
            if (cmd === 'gangs') response = 'DECRYPTING GANG FILES... DATA LOADED BELOW.';
            if (cmd === 'leaks') response = 'ACCESSING SECURE SERVERS... LEAKS UNLOCKED.';
            if (cmd === 'status') response = 'SERVER STATUS: ALL GREEN. ANONYMITY: ACTIVE.';
            if (cmd === 'clear') { setLogs([]); setCommand(''); return; }
            if (cmd === 'exit') { navigate('/'); return; }

            setLogs(prev => [...prev.slice(-5), `> ${command}`, response]);
            setCommand('');
        }
    };

    return (
        <div className="secret-page">
            <canvas ref={canvasRef} className="matrix-canvas" />
            <div className="crt-scanlines" />
            <div className="crt-flicker" />

            <div className="terminal-container">
                <div className="terminal-header">
                    <span><Terminal size={18} /> TIGER_DARKNET_V4</span>
                    <span><Wifi size={14} /> ANONYMOUS CONNECTION</span>
                    <span><Cpu size={14} /> CPU: 98%</span>
                </div>

                <div className="secret-content">
                    <div className="terminal-logs">
                        {logs.map((log, i) => (
                            <div key={i} className="log-line">{log}</div>
                        ))}
                        <div ref={logsEndRef} />
                    </div>

                    <div className="command-line">
                        <span className="command-prompt">root@tiger-city:~#</span>
                        <input
                            type="text"
                            className="command-input"
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            onKeyDown={handleCommand}
                            placeholder="Type 'help' for commands..."
                            autoFocus
                        />
                    </div>

                    <div className="secret-vault-grid">
                        <div className="vault-item glass-panel">
                            <h3><Skull size={18} /> ملفات العصابات</h3>
                            <p>جميع المقرات السرية للعصابات تحت المراقبة.</p>
                            <div className="status-online">● متصل</div>
                        </div>
                        <div className="vault-item glass-panel">
                            <h3><Database size={18} /> أرشيف التسريبات</h3>
                            <p>خرائط التوسع والأسلحة القادمة حصرياً هنا.</p>
                            <div className="status-warning">● قيد التشفير</div>
                        </div>
                        <div className="vault-item glass-panel">
                            <h3><EyeOff size={18} /> التجسس</h3>
                            <p>أدوات مراقبة الشرطة والتحركات المشبوهة.</p>
                            <div className="status-offline">● غير نشط</div>
                        </div>
                    </div>

                    <section style={{ marginTop: '40px' }} className="fade-in">
                        <h2><Lock size={20} /> خزانة المعلومات السرية</h2>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>الكود</th>
                                    <th>نوع المعلومة</th>
                                    <th>الأهمية</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>TR-552</td>
                                    <td>موقع البنك السري</td>
                                    <td>عالية جداً</td>
                                </tr>
                                <tr>
                                    <td>WP-990</td>
                                    <td>تهريب أسلحة ثقيلة</td>
                                    <td>متوسطة</td>
                                </tr>
                                <tr>
                                    <td>GN-001</td>
                                    <td>زعيم عصابة الظل</td>
                                    <td>سرية للغاية</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <div className="warning-box">
                        <ShieldAlert size={24} /> خطر: النظام يراقب تحركاتك. لا تطل البقاء هنا.
                    </div>

                    <button className="back-btn-terminal" onClick={() => navigate('/')}>
                        [TERMINATE_SESSION]
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Secret;
