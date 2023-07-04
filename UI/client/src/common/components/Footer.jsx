import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="site-footer" style={{backgroundImage: "url(/assets/images/backgrounds/footer-bg-1-1.jpg)"}}>
    <div className="site-footer__top">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-duration="1500ms"
            data-wow-delay="000ms">
            <div className="site-footer__widget site-footer__widget__about">
              <a href="index.html" className="site-footer__widget__logo">
                <img src="/assets/images/logo-white.png" width="110" height="100" alt=""/>
              </a>
              <p className="site-footer__widget__text">Haile G/Silassie Road, Ministry of Water &Energy Head Office ADDIS ABABA, ETHIOIA</p>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-duration="1500ms"
            data-wow-delay="100ms">
            <div className="site-footer__widget">
              <h3 className="site-footer__widget__title">Links</h3>
              <ul className="list-unstyled site-footer__widget__links">
                <li><a href="donations.html">Home</a></li>
                <li><a href="about.html">Services</a></li>
                <li><a href="donations-details.html">News</a></li>
                <li><a href="about.html">Member Utilties</a></li>
                <li><a href="events.html">Contact Us</a></li>
                <li><a href="events.html">Publications</a></li>
                <li><a href="events.html">Vaccancy</a></li>
              </ul>
            </div>
          </div>
      
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-duration="1500ms"
            data-wow-delay="300ms">
            <div className="site-footer__widget">
              <h3 className="site-footer__widget__title">Contact</h3>
             
              <ul className="list-unstyled site-footer__widget__contact">
                <li>
                  <i className="fa fa-envelope-open"></i>
                  <a href="mailto:needhelp@company.com">ahmedmuktar83@gmail.com </a>
                </li>
                <li>
                  <i className="fa fa-mobile"></i>
                  <a href="tel:+1(307)776-0608">+  (251) 940-506-880</a>
                </li>
              </ul>
            </div>
          </div>
        
        </div>
      </div>
    </div>
    <div className="site-footer__bottom">
      <div className="container">
        <div className="site-footer__bottom__inner">
          <p className="site-footer__bottom__text">© Copyright <span className="dynamic-year"></span> by
            Layerdrops.com</p>
            <p className="site-footer__bottom__text">Developed By <span className="dynamic-year"></span> by
            Dafetech Social ICT Solution</p>
          <div className="site-footer__social">
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-pinterest"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>

        </div>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
