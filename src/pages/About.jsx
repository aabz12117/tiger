import { Target, Star, Map, BookOpen, Users, Briefcase, Zap, ShieldCheck } from 'lucide-react';
import '../styles/About.css';

const About = () => {
    return (
        <div className="about-page container fade-in">
            {/* Intro Section */}
            <section className="about-hero">
                <h1>عن تايقر سيتي</h1>
                <p className="lead">
                    سيرفر تايقر سيتي الواقعية في روبلوكس، متواجد في عالم حياة الواقعية بنظام Roleplay عالي الجودة.
                </p>
            </section>

            {/* Story Section */}
            <section className="story-section">
                <div className="story-card">
                    <BookOpen className="story-icon" size={40} />
                    <h2>من نحن؟</h2>
                    <p>
                        نحن مجتمع يسعى للأفضل دائماً. نرحب بالجميع لتقديم تجربة حياة واقعية (RP)
                        تتميز بالتنظيم المستمر والأفكار المتنوعة. هدفنا خدمتكم وإرضائكم في بيئة لعب ممتعة وآمنة.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-header-text">مميزات السيرفر</h2>
                <div className="features-grid">
                    <div className="feature-item">
                        <Users className="f-icon" />
                        <h3>رول بلاي عالي</h3>
                        <p>نظام RP محترف وتنظيم مستمر ومكثف من قبل الإدارة.</p>
                    </div>
                    <div className="feature-item">
                        <Zap className="f-icon" />
                        <h3>سيناريوهات جبارة</h3>
                        <p>قصص وسيناريوهات متنوعة ومستمرة لا تتوقف.</p>
                    </div>
                    <div className="feature-item">
                        <Briefcase className="f-icon" />
                        <h3>وظائف منوعة</h3>
                        <p>فرص عمل جديدة ومتنوعة تناسب جميع اللاعبين.</p>
                    </div>
                    <div className="feature-item">
                        <ShieldCheck className="f-icon" />
                        <h3>طاقم إداري عظيم</h3>
                        <p>فريق إداري متواجد لخدمتكم، يسعى دائماً للأفضل.</p>
                    </div>
                    <div className="feature-item">
                        <Map className="f-icon" />
                        <h3>أفكار مستمرة</h3>
                        <p>تطوير مستمر وأفكار متنوعة تجعل السيرفر متجدد دائماً.</p>
                    </div>
                    <div className="feature-item">
                        <Star className="f-icon" />
                        <h3>المتعة هنا</h3>
                        <p>بيئة تجمع كل ما هو ممتع في عالم روبلوكس.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
