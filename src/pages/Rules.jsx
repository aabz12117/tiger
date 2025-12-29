import { ShieldAlert, AlertTriangle, UserCheck, Gavel, Shield, Siren, Flame, Skull, ShieldCheck, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import '../styles/Rules.css';

const RuleSection = ({ icon: Icon, title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`rules-section glass-panel ${isOpen ? 'open' : ''}`}>
            <div className="section-title clickable" onClick={() => setIsOpen(!isOpen)}>
                <div className="title-content">
                    <Icon className="icon" />
                    <h3>{title}</h3>
                </div>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            <div className="section-content">
                {children}
            </div>
        </div>
    );
};

const RuleItem = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <li className="rule-item">
            <span>{text}</span>
            <button className="copy-btn" onClick={handleCopy} title="نسخ القانون">
                {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
            </button>
        </li>
    );
};

const Rules = () => {
    return (
        <div className="rules-page container fade-in">
            <h1 className="page-title">القوانين والأنظمة</h1>

            {/* Ministry of Interior Rules */}
            <section className="rules-category">
                <div className="category-header">
                    <Shield size={32} className="cat-icon" />
                    <h2>قوانين وزارة الداخلية</h2>
                </div>

                <div className="rules-grid">
                    <RuleSection icon={ShieldCheck} title="القوانين العامة" defaultOpen={true}>
                        <ul className="rules-list">
                            <RuleItem text="الالتزام والانضباط بالأوامر والتوجيهات العليا." />
                            <RuleItem text="الحفاظ على الأخلاقيات المهنية والامتثال لقوانين الدولة." />
                            <RuleItem text="السرية التامة وحماية المعلومات والمستندات الأمنية." />
                            <RuleItem text="التعامل مع الجمهور باحترام وعدل وإنصاف دون تمييز." />
                            <RuleItem text="الالتزام بالزي الرسمي وصيانة المعدات الأمنية." />
                            <RuleItem text="استخدام القوة فقط في الحالات الضرورية والمتناسبة مع الموقف." />
                            <RuleItem text="يمنع الفساد بكافة أشكاله ويحاسب عليه القانون." />
                        </ul>
                    </RuleSection>

                    <RuleSection icon={Siren} title="الأقسام المتخصصة">
                        <ul className="rules-list">
                            <RuleItem text="الشرطة: التواجد في النقاط، الدوريات، توثيق الحوادث، والاستجابة للبلاغات." />
                            <RuleItem text="المرور: تنظيم الحركة، تقليل الحوادث، وإصدار المخالفات حسب اللوائح." />
                            <RuleItem text="الدفاع المدني: جاهزية معدات الطوارئ وتقديم الإسعافات الأولية." />
                        </ul>
                    </RuleSection>
                </div>
            </section>

            {/* Gang Rules */}
            <section className="rules-category">
                <div className="category-header">
                    <Skull size={32} className="cat-icon danger" />
                    <h2>قوانين العصابات</h2>
                </div>

                <div className="rules-grid">
                    <RuleSection icon={Flame} title="الأنظمة الإجرامية">
                        <ul className="rules-list two-col">
                            <RuleItem text="التفتيش منطقة آمنة ويمنع التهديد فيها نهائياً." />
                            <RuleItem text="الالتزام بالأنظمة الإجرامية لأن مخالفتها تحدث إنذار للعصابة." />
                            <RuleItem text="بعد الإعدام، لا يحق لك التقديم على أي وظيفة إلا بعد يوم كامل." />
                            <RuleItem text="إحترام جميع الفئات في الدولة سواء مواطنين أو ذوي مناصب." />
                            <RuleItem text="الالتزام بقوانين السيرفر وعدم مخالفة قوانين الدولة." />
                            <RuleItem text="احترام الرهائن وعدم قتلهم في حال تجاوبهم وانصياعهم للأوامر." />
                            <RuleItem text="يمنع تكلم أي شخص في السيناريو ما عدا المفاوض." />
                            <RuleItem text="الحذر من الوقوع في مخالفات 'خارج الرول بلاي'." />
                        </ul>
                    </RuleSection>
                </div>
            </section>

            {/* Punishments */}
            <div className="punishments-section">
                <div className="section-title centered">
                    <Gavel className="icon" />
                    <h2>لائحة العقوبات العامة</h2>
                </div>

                <div className="punishment-cards">
                    <div className="p-card warning glass-card">
                        <AlertTriangle size={32} />
                        <h3>إنذار</h3>
                        <p>للمخالفات البسيطة أو تجاوز التعليمات.</p>
                    </div>

                    <div className="p-card kick glass-card">
                        <UserCheck size={32} />
                        <h3>طرد مؤقت (Kick)</h3>
                        <p>لتكرار المخالفات أو عدم احترام القوانين.</p>
                    </div>

                    <div className="p-card ban glass-card">
                        <ShieldAlert size={32} />
                        <h3>حظر (Ban)</h3>
                        <p>استخدام الهاكات، الفساد الإداري، أو الإساءة الجسيمة.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rules;
