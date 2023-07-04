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
              alt=""
            />
          </a>

          <ul className="main-menu__list">
            <li className={location.pathname === "/" ? " current" : ""}>
              <Link to="/">{t("home.1")}</Link>
            </li>         
            <li
              className={
                location.pathname === "/whoweare" ||
                location.pathname === "/vision" ||
                location.pathname === "/valueobjective" ||
                location.pathname === "/chairmanmessage"
                  ? "menu-item-has-children active"
                  : "menu-item-has-children"
              }
            >
              <a href="#">{t("aboutus.1")}</a>
              <ul>
                <li
                  className={
                    location.pathname === "/whoweare" ? "active" : ""
                  }
                >
                  <Link to="/whoweare"> Who We Are</Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname === "/vision" ? "active" : ""
                    }
                    to="/vision"
                  >
                    Vision
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname === "/valueobjective" ? "active" : ""
                    }
                    to="/valueobjective"
                  >
                    Core Values & Objectives
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname === "/chairmanmessage" ? "active" : ""
                    }
                    to="/chairmanmessage"
                  >
                    Chairman's Message
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={
                location.pathname === "/events" ||
                location.pathname === "/training" 
                
                  ? "menu-item-has-children active"
                  : "menu-item-has-children"
              }
            >
              <a href="#">Services</a>
              <ul>
              <li className={location.pathname === "/events" ? "current" : ""}>
              <Link to="/events">Events</Link>
            </li>
                <li>
                  <Link
                    className={
                      location.pathname === "/training" ? "active" : ""
                    }
                    to="/training"
                  >
                    Trainings & Capacity Building
                  </Link>
                </li>
              </ul>
            </li>
            <li className={location.pathname === "/news" ? "current" : ""}>
              <Link to="/news">{t("news.1")}</Link>
            </li>
            <li
              className={
                location.pathname === "/orgstract" ||
                location.pathname === "/team"
                  ? "menu-item-has-children active"
                  : "menu-item-has-children"
              }
            >
              <a href="#">Team</a>
              <ul>
                <li
                  className={
                    location.pathname === "/orgstract" ? "active" : ""
                  }
                >
                  <Link to="/orgstract">Organization Structure</Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname === "/team" ? "active" : ""
                    }
                    to="/team"
                  >
                    Members Profile
                  </Link>
                </li>
                <li className={location.pathname === "/team" ? "current" : ""}>
              <Link to="/team">{t("memberutilites.1")}</Link>
            </li>
              </ul>
            </li>
            <li
              className={
                location.pathname === "/gallery" ||
                location.pathname === "/newsandevents"
                  ? "menu-item-has-children active"
                  : "menu-item-has-children"
              }
            >
              <a href="#">Media</a>
              <ul>
                <li
                  className={
                    location.pathname === "/gallery" ? "active" : ""
                  }
                >
                  <Link to="/gallery">Photo Gallery</Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname === "/newsandevents"? "active" : ""
                    }
                    to="/newsandevents"
                  >
                    News & Events
                  </Link>
                </li>
              </ul>
            </li>
          
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
                <li className={location.pathname === "/contact" ? "current" : ""}>
              <Link to="/contact">{t("contactus.1")}</Link>
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
