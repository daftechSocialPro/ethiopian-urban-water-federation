import axios from "axios";
import React from "react";

import { useState } from "react";
import { urlContact } from "../endpoints";

import { customToast } from "../components/customToast";
import { useTranslation } from 'react-i18next'


function Contact() {
  const { t } = useTranslation()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();


    const formData = new FormData();

    formData.set("Name", name);
    formData.set("Email", email);
    formData.set("Subject", subject);
    formData.set("Message", message);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    try {
      // setIsLodding(true)
      //   axios.defaults.withCredentials = true;
      axios
        .post(urlContact, formData)
        .then((res) => {
          customToast("message Successfully sent", 0);
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        })
        .catch((err) => {
          alert(err);
          console.error(err);
        });
    } catch (error) {
      //setIsLodding(false)
      customToast(error, 1);
      console.error(error);
    }
  };

  return (
    <>
      <section
        className="page-header"
        style={{ backgroundImage: "url(/assets/images/backgrounds/1.jpeg)" }}
      >
        <div className="container">
          <ul className="list-unstyled breadcrumb-one">
            <li>
              <a href="index.html">{t("home.1")}</a>
            </li>
            <li>
              <span>{t("contactus.1")}</span>
            </li>
          </ul>
          <h2 className="page-header__title">{t("contactus.1")}</h2>
        </div>
      </section>
      <section className="contact-info">
        <div className="container">
          <div
            className="contact-info__inner wow fadeInUp"
            data-wow-duration="1500ms"
            style={{
              backgroundImage:
                "url(/assets/images/backgrounds/contact-info-bg-1-1.jpg)",
            }}
          >
            <div className="row gutter-y-30">
              <div className="col-lg-4 col-md-12">
                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <i className="fas fa-envelope-open"></i>
                  </div>
                  <p className="contact-info__text">
                    <a href="mailto:needhelp@company.com">
                      ahmedmuktar83 @gmail.com
                    </a>
                    <br />
                    <a href="mailto:info@company.com">info@company.com</a>
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <i className="fa fa-map"></i>
                  </div>
                  <p className="contact-info__text">
                  {t("address.1")} <br />
      
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <i className="fa fa-mobile"></i>
                  </div>
                  <p className="contact-info__text">
                    <a href="tel:+1(307)776-0608">+ (251) 940-506-880</a>
                    <br />
                    <a href="tel:6668888000">+ (251) 940-506-880</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec-pad-top sec-pad-bottom contact-one">
        <div className="container">
          <div className="row gutter-y-60">
            <div className="col-lg-4">
              <div className="sec-title">
                <p className="sec-title__tagline">{t("contactus1.1")}</p>
                <h2 className="sec-title__title">{t("love.1")}</h2>
              </div>
              <p className="contact-one__text">
                Man braid hell of edison bulb four brunch subway tile authentic,
                chillwave put a bird on church-key try-hard ramps heirloom.
              </p>
              <div className="contact-one__social">
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
            </div>
            <div className="col-lg-8">
              <form
              onSubmit={handleSubmit}
                className="contact-one__form contact-form-validated"
              >
                <div className="row">
                  <div className="col-md-6">
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required  placeholder={t("name.1")} name="name" />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      value={email}
                      required
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder={t("email.1")}
                      name="email"
                    />
                  </div>
                  <div className="col-md-12">
                  <input type="text" value={subject} onChange={(e)=>setSubject(e.target.value)} required  placeholder={t("subject.1")} name="name" />
                 
                  </div>
                  <div className="col-md-12">
                    <textarea
                      name="message"
                      placeholder={t("message.1")}
                      value={message}
                      onChange={(e)=>setMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="thm-btn contact-one__btn">
                      <span>{t("send.1")}</span>
                    </button>
                  </div>
                </div>
              </form>
              <div className="result"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="google-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.55121124798!2d38.778332073923366!3d9.013376689235578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85a71833e2f1%3A0xfd76f28453bc64f8!2sministry%20of%20water%20and%20irrigation%20and%20energy%20in!5e0!3m2!1sen!2snl!4v1680764221807!5m2!1sen!2snl">
          className="google-map__two"
          allowFullScreen</iframe>
      </section>
    </>
 
  );
}

export default Contact;
