import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer" dir="rtl" aria-labelledby="footer-heading">
            <div className="container footer-content">
                <div className="footer-logo">
                    <img src="/assets/logo.png" alt="شعار تايقر سيتي" width="50" />
                    <h3 id="footer-heading">تايقر سيتي</h3>
                    <p>مجتمعك المفضل في عالم روبلوكس</p>
                </div>

                <nav className="footer-links" aria-label="روابط سريعة">
                    <h4>روابط سريعة</h4>
                    <ul>
                        <li><a href="/rules">القوانين</a></li>
                        <li><a href="/updates">التحديثات</a></li>
                        <li><a href="/about">عن الماب</a></li>
                    </ul>
                </nav>

                <div className="footer-social" aria-label="تواصل معنا">
                    <h4>تواصل معنا</h4>
                    <div className="social-icons">
                        <a
                            href="https://discord.gg/7a4UHZfUJW"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-btn"
                            aria-label="ديسكورد السيرفر (يفتح في نافذة جديدة)"
                        >
                            ديسكورد السيرفر
                        </a>
                        <a
                            href="https://discord.gg/ntAUXDKMYb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-btn"
                            aria-label="ديسكورد المتجر (يفتح في نافذة جديدة)"
                        >
                            ديسكورد المتجر
                        </a>
                        <a
                            href="https://www.tiktok.com/@.tiger.city"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-btn"
                            aria-label="تيك توك (يفتح في نافذة جديدة)"
                        >
                            تيك توك
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
