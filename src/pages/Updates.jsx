import { Calendar, Tag } from 'lucide-react';
import '../styles/Updates.css';

const Updates = () => {
    const updates = [
        {
            version: '2.5',
            date: '29 ديسمبر 2025',
            title: 'تحديث الشتاء الكبير',
            changes: [
                { type: 'new', text: 'إضافة منطقة ثلجية بالكامل شمال المدينة' },
                { type: 'new', text: 'نظام التدفئة للمنازل' },
                { type: 'new', text: '3 سيارات جديدة (دفع رباعي)' },
                { type: 'new', text: 'وظيفة متزلج محترف' },
                { type: 'fix', text: 'إصلاح مشكلة حفظ السيارات' }
            ]
        },
        {
            version: '2.4',
            date: '15 نوفمبر 2025',
            title: 'تحديث الشرطة',
            changes: [
                { type: 'new', text: 'مركز شرطة جديد' },
                { type: 'new', text: 'سيارات شرطة بسرعات عالية' },
                { type: 'improve', text: 'نظام سجن متطور' },
                { type: 'fix', text: 'تصحيح بعض القوانين في اللعبة' }
            ]
        },
        {
            version: '2.3',
            date: '01 أكتوبر 2025',
            title: 'تحديث الاقتصاد',
            changes: [
                { type: 'new', text: 'نظام بنكي جديد' },
                { type: 'improve', text: 'زيادة الرواتب لجميع الوظائف' },
                { type: 'new', text: 'إمكانية شراء عقارات تجارية' }
            ]
        }
    ];

    const getBadgeStyle = (type) => {
        switch (type) {
            case 'new': return { bg: 'rgba(0, 255, 136, 0.1)', color: '#00ff88', label: 'جديد' };
            case 'improve': return { bg: 'rgba(0, 195, 255, 0.1)', color: '#00c3ff', label: 'تحسين' };
            case 'fix': return { bg: 'rgba(234, 46, 10, 0.1)', color: '#ff4d4d', label: 'إصلاح' };
            default: return { bg: 'rgba(255, 255, 255, 0.1)', color: '#fff', label: '' };
        }
    };

    return (
        <div className="updates-page container fade-in">
            <h1 className="page-title">سجل التحديثات</h1>

            <div className="timeline">
                {updates.map((update, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content glass-card">
                            <div className="update-header">
                                <span className="version-badge">v{update.version}</span>
                                <div className="update-date">
                                    <Calendar size={16} />
                                    <span>{update.date}</span>
                                </div>
                            </div>

                            <h2>{update.title}</h2>

                            <div className="changes-list">
                                {update.changes.map((change, i) => {
                                    const style = getBadgeStyle(change.type);
                                    return (
                                        <div key={i} className="change-item">
                                            <span
                                                className="change-badge"
                                                style={{ backgroundColor: style.bg, color: style.color }}
                                            >
                                                {style.label}
                                            </span>
                                            <span className="change-text">{change.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Updates;
