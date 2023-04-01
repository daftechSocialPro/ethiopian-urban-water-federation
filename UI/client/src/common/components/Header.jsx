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
                <a href="tel:+1(307)776-0608">+(251) 940-506-880</a>
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

            <li className={location.pathname === "/news" ? "current" : ""}>
              <Link to="/news">{t("news.1")}</Link>
            </li>
            <li className={location.pathname === "/team" ? "current" : ""}>
              <Link to="/waterutility">{t("memberutilites.1")}</Link>
            </li>
            <li className={location.pathname === "/contact" ? "current" : ""}>
              <Link to="/contact">{t("contactus.1")}</Link>
            </li>

            <li
              className={
                location.pathname === "/vaccancy" ||
                location.pathname === "/researches"
                  ? "menu-item-has-children active"
                  : "menu-item-has-children"
              }
            >
              <a href="#"> {t("others.1")}</a>
              <ul>
                <li
                  className={
                    location.pathname === "/researches" ? "active" : ""
                  }
                >
                  <Link to="/vaccancy">{t("vaccancy.1")}</Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname === "/vaccancy" ? "active" : ""
                    }
                    to="/researches"
                  >
                    {t("publication.1")}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* <div className="main-menu__right">
            <div className="main-menu__cta">
              <div className="main-menu__cta__icon">
                <i className="paroti-icon-volunteer"></i>
              </div>
              <div className="main-menu__cta__text">
                <span>Join us now</span>
                <a href="contact.html">Become a Volunteer</a>
              </div>
            </div>
            <a href="donations-details.html" className="thm-btn thm-btn--two ">
              <span>Donate Now</span>
              <i className="fa fa-heart"></i>
            </a>
            <a href="#" className="main-header__btn search-toggler">
              <i className="paroti-icon-magnifying-glass"></i>
            </a>
            <a href="donations.html" className="main-header__btn">
              <i className="paroti-icon-shopping-cart"></i>
            </a>
            <a href="#" className="main-header__toggler mobile-nav__toggler">
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div> */}
        </div>
      </nav>
    </header>
  );
}

export default Header;
