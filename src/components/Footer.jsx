import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-logo">
                    <img src="/assets/logo.png" alt="Tiger City" width="50" />
                    <h3>تايقر سيتي</h3>
                    <p>مجتمعك المفضل في عالم روبلوكس</p>
                </div>

                <div className="footer-links">
                    <h4>روابط سريعة</h4>
                    <a href="/rules">القوانين</a>
                    <a href="/updates">التحديثات</a>
                    <a href="/about">عن الماب</a>
                </div>

                <div className="footer-social">
                    <h4>تواصل معنا</h4>
                    <div className="social-icons">
                        {/* Placeholders for social links */}
                        <a href="https://discord.gg/7a4UHZfUJW" target="_blank" rel="noopener noreferrer" className="social-btn">ديسكورد السيرفر</a>
                        <a href="https://discord.gg/ntAUXDKMYb" target="_blank" rel="noopener noreferrer" className="social-btn">ديسكورد المتجر</a>
                        <a href="https://twitter.com/TigerCity" className="social-btn">Twitter</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Tiger City. جميع الحقوق محفوظة.</p>
            </div>
        </footer>
    );
};

export default Footer;
