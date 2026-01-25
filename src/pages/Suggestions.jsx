import { useState } from 'react';
import { Send, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import '../styles/Suggestions.css';

const Suggestions = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        type: 'suggestion',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const webhookUrl = 'https://discordapp.com/api/webhooks/1455645831888638026/jHpavPmrnjwaXfrReQZDiXqYs8zFMeN7YdWeDvWFc50Sg6gwjFPR_P_mfrMnETQZ5RbU';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.message.trim()) {
            setStatus({ type: 'error', message: 'يرجى كتابة الرسالة' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        const embedColor = formData.type === 'suggestion' ? 3447003 : 15158332; // Blue for suggestion, Red for complaint

        const payload = {
            embeds: [
                {
                    title: formData.type === 'suggestion' ? '💡 اقتراح جديد' : '⚠️ شكوى جديدة',
                    color: embedColor,
                    thumbnail: {
                        url: 'https://raw.githubusercontent.com/aabz12117/tiger/main/public/assets/logo.png'
                    },
                    fields: [
                        { name: '👤 الاسم', value: `\`${formData.name || 'مجهول'}\``, inline: true },
                        { name: '📱 طريقة التواصل', value: `\`${formData.contact || 'غير محدد'}\``, inline: true },
                        { name: '📝 النوع', value: `\`${formData.type === 'suggestion' ? 'اقتراح' : 'شكوى'}\``, inline: true },
                        { name: '💬 الرسالة', value: `\`\`\`${formData.message}\`\`\`` }
                    ],
                    footer: {
                        text: 'نظام الاقتراحات - تايقر سيتي',
                        icon_url: 'https://raw.githubusercontent.com/aabz12117/tiger/main/public/assets/logo.png'
                    },
                    timestamp: new Date().toISOString()
                }
            ]
        };

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'تم إرسال رسالتك بنجاح! شكراً لك.' });
                setFormData({ name: '', contact: '', type: 'suggestion', message: '' });
            } else {
                throw new Error('Failed to send');
            }
        } catch {
            setStatus({ type: 'error', message: 'عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="suggestions-page fade-in">
            <div className="container suggestions-container">
                <div className="suggestions-header">
                    <h1>الاقتراحات والشكاوي</h1>
                    <p>صوتك يهمنا. شاركنا اقتراحاتك لتطوير المدينة أو قدم شكواك وسنقوم بمراجعتها.</p>
                </div>

                <div className="suggestions-card glass-panel">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>الاسم (اختياري)</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="ادخل اسمك هنا..."
                            />
                        </div>

                        <div className="form-group">
                            <label>طريقة التواصل (اختياري)</label>
                            <input
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="رقم هاتف، ديسكورد، أو يوزر روبلوكس..."
                            />
                        </div>

                        <div className="form-group">
                            <label>نوع الرسالة</label>
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option value="suggestion">اقتراح</option>
                                <option value="complaint">شكوى</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>الرسالة</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="اكتب ما يدور في ذهنك هنا..."
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? (
                                'جاري الإرسال...'
                            ) : (
                                <>
                                    <Send size={20} />
                                    <span>إرسال</span>
                                </>
                            )}
                        </button>

                        {status.message && (
                            <div className={`status-message ${status.type}`}>
                                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                <span>{status.message}</span>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Suggestions;
