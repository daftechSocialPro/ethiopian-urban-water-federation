import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { assetUrl, urlresearch } from "../endpoints";
import dateFormat from "dateformat";
import { useTranslation } from "react-i18next";
import Pagination from '../components/Pagination'

let PageSize = 2

function Researches() {
  const { t } = useTranslation()
  const [research, setresearch] = useState([]);
  const [filterdList, setfilterdreserchsList] =useState([]);
  const  [searchParm,setSearchParam]= useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(()=>{

    setfilterdreserchsList(
    research.filter(research => research.title.toLowerCase().includes(searchParm.toLowerCase()))
  )
  },[searchParm])
  const getImage = (item) => {
    return `${assetUrl}/${item}`;
  };

  useEffect(() => {
    axios
      .get(urlresearch)
      .then((res) => {
        setresearch(res.data);
        setfilterdreserchsList(res.data)
      })
      .catch((err) => console.error(err));
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return research.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, research])

  const filterdStyle = ( index ) => {
    const buttonStyle = {
      backgroundColor: index%2===0 ? 'white' : '',
     
     
    };
    return buttonStyle;
  }

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
              <span>{t("publication.1")} </span>
            </li>
          </ul>

          <h2 className="page-header__title">{t("publication.1")} </h2>
        </div>
      </section>

      <section className="sec-pad-top sec-pad-bottom blog-details">
        <div className="container">
          <div className="row gutter-y-60">
            <div className="col-lg-8">
              <div className="blog-details__comments">
                <h3 className="blog-details__sec__title">
                  {research.length} {t("publication1.1")}
                </h3>
                <ul className="list-unstyled blog-details__comments__list">
                  {currentTableData.map((item, index) => (
                    <li key={index}>
                      <img
                        src={getImage(item.authorImagePath)}
                        style={{ maxWidth: "120px" }}
                        alt=""
                      />
                      <div className="blog-details__comments__meta">
                        <h3 className="blog-details__comments__name">
                          {item.author} {`(${item.title})`}
                        </h3>
                        <p className="blog-details__comments__date">
                          {dateFormat(item.publishedAt, "d mmm , yyyy")}
                        </p>
                      </div>
                      <p
                        className="blog-details__comments__text"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>

                      <a
                        target="_blank"
                        href={getImage(item.researchFilePath)}
                        className="thm-btn blog-details__comments__btn"
                      >
                        <span>Download</span>
                      </a>
                    </li>
                  ))}
            
                </ul>
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={research.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="sidebar__single sidebar__single--search">
                  <form action="#">
                    <input type="text" className="searhcInput" value={searchParm} onChange={(e)=>setSearchParam(e.target.value)} placeholder={t("search.1")} />
                    <button type="submit">
                      <i className="paroti-icon-magnifying-glass"></i>
                    </button>
                  </form>
                </div>
                <div className="sidebar__single sidebar__single--posts">
                  <h3 className="sidebar__title">{t("recent.1")} </h3>
                  <ul className="list-unstyled sidebar__post">
                    {filterdList.slice(0, 4).map((item, index) => (
                      <li key={index} style={filterdStyle(index)} >
                        <a href="#">
                          <img
                            style={{ maxWidth: "50px" }}
                            src={getImage(item.authorImagePath)}
                            alt=""
                          />
                          <span className="sidebar__post__meta">
                            {item.author}
                          </span>
                          <span className="sidebar__post__title">
                            {item.title}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Researches;
