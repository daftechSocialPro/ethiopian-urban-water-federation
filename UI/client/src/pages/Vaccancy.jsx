import React,  { useState, useEffect, useMemo }  from 'react'
import {urlVaccancy, assetUrl} from '../../src/endpoints'
import axios from "axios";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import dateFormat from "dateformat";
import { useTranslation } from 'react-i18next';
import Pagination from '../components/Pagination'

import './vacancy.css'

function Vaccancy() {
  let PageSize = 2
 const [vaccancy , setVaccancy] =useState([])
 const { t } = useTranslation()
 const [currentPage, setCurrentPage] = useState(1)
 const [readMore,setReadMore]=useState(false);
 useEffect(() => {
  axios
    .get(urlVaccancy)
    .then((res) => {
      console.log("client vacancy",res.data)
      setVaccancy(res.data);
      
    })
    .catch((err) => console.error(err));
}, []);

const vaccancyss = useMemo(() => {
  const firstPageIndex = (currentPage - 1) * PageSize
  const lastPageIndex = firstPageIndex + PageSize
  return vaccancy.slice(firstPageIndex, lastPageIndex)
}, [currentPage, vaccancy])


const getImage = (item) => {
  return `${assetUrl}/${item}`;
};

const linkName= readMore?'Read Less << ':'Read More >> '



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
              <span> Vaccancy </span>
            </li>
          </ul>

          <h2 className="page-header__title">Vaccancy</h2>
        </div>
      </section>
      <section className="above">
        <div className="container ">
          <div className="row gutter-y-30">
          <div className="col-lg-10">
          <h3 className="blog-details__sec__title">
                  {vaccancy.length} Vaccancy
                </h3>
            {vaccancy.map((item, index) =>
              <div key={index} className="">
                {/* blog-card */}
                <div className="">
                  <h4 className='title'>{item.title}/ {item.amharicTitle}</h4>
                  <h5  className='title'>Employeer: {item.company}</h5>
                  <h6  className='title'>Published By: {item.user.fullName}</h6>
                  <h6  className='title'>{item.toDateTime}</h6>
                  <h6 className='datee'>Posted 6 days ago</h6>
                  <p dangerouslySetInnerHTML={{ __html: item.description.slice(0,399) }}></p>
                      <a className="btuu" onClick={()=>{setReadMore(!readMore)}}><span>{linkName}</span></a>
                      {readMore &&  <p dangerouslySetInnerHTML={{ __html:item.description.slice(399,-1) }} ></p>}
                 
                  <p><span>For any inquiries contact us </span>{item.email}</p>
                  <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={vaccancy.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
                  </div>
                 
                </div>

                
               
             
             
            )}

</div>

          </div>
        </div>
      </section>
     
    
    
    
    </>
    
    
  )
}

export default Vaccancy