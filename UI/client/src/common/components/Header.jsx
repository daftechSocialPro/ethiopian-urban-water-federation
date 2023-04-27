import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header() {
  const location = useLocation();

  const { t, i18n } = useTranslation();

  function clickLanguage(lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <header className="main-header">
      <div className="topbar">
        <div className="container-fluid">
          <div className="topbar__inner">
            <ul className="list-unstyled topbar__info">
              <li>
                <i className="fa fa-map"></i>
                <a href="#">{t("address.1")}</a>
              </li>
              <li>
                <i className="fa fa-envelope-open"></i>
                <a href="mailto:needhelp@company.com">
                  ahmedmuktar83 @gmail.com
                </a>
              </li>
              <li>
                <i className="fa fa-mobile"></i>
                <a href="tel:+1(307)776-0608">+(251)940-506-880</a>
              </li>
            </ul>
            <div className="topbar__social">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-pinterest"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <ul className="list-unstyled topbar__links">
              {/* <li>
                <a href="#">Login</a>
              </li> */}

              <li>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => clickLanguage("en")}
                >
                  {" "}
                  {t("english.1")}{" "}
                </a>
              </li>
              <li>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => clickLanguage("am")}
                >
                  {t("amharic.1")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav className="main-menu sticky-header" style={{}}>
        <div className="container-fluid">
          <a href="index.html" className="main-header__logo">
            <img
              src="/assets/images/logo-dark.png"
              width="200"
              height="60"
              alt=""
            />
          </a>

          <ul className="main-menu__list">
            <li className={location.pathname === "/" ? " current" : ""}>
              <Link to="/">{t("home.1")}</Link>
            </li>
            <li className={location.pathname === "/about" ? "current" : ""}>
              <Link to="/about">{t("aboutus.1")}</Link>
            </li>

            <li className={location.pathname === "/news" || location.pathname==="/news/detail" ? "current" : ""}>
              <Link to="/news">{t("news.1")}</Link>
            </li>
            <li className={location.pathname === "/waterutility" || location.pathname==="/waterutility/detail" ? "current" : ""}>
              <Link to="/waterutility">{t("memberutilites.1")}</Link>
            </li>
            <li className={location.pathname === "/contact" ? "current" : ""}>
              <Link to="/contact">{t("contactus.1")}</Link>
            </li>
            
            <li className={location.pathname === "/researches" ? "current" : ""}>
              <Link to="/researches">{t("publication.1")}</Link>
              </li>
            <li className={location.pathname === "/vaccancy" ? "current" : ""}>
              <Link to="/vaccancy">Vaccancy</Link>
            </li>
          </ul>

      
        </div>
      </nav>
    </header>
  );
}

export default Header;
