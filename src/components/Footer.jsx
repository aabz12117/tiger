import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-logo">
                    <img src="assets/logo.png" alt="Tiger City" width="50" />
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
                        <a href="https://www.tiktok.com/@.tiger.city" target="_blank" rel="noopener noreferrer" className="social-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.394 6.394 0 0 0-5.394 10.792 6.394 6.394 0 0 0 10.85-4.424V8.687a8.183 8.183 0 0 0 3.774-1.052V6.686z" />
                            </svg>
                            TikTok
                        </a>
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
