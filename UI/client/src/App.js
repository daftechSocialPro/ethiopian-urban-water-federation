import Footer from "./common/components/Footer";
import Header from "./common/components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./common/components/Layout";
import About from "./pages/About";
import Home from "./pages/Home";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import News from "./pages/News";
import WaterUtilitys from "./pages/WaterUtility";
import Researches from "./pages/Researches";
import Vaccancy from "./pages/Vaccancy";
import NewsDetail from "./pages/NewsDetail";
import WaterUtilityDetail from "./pages/WaterUtilityDetail";
import ForumDetail from "./pages/ForumDetail";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home/>}/>
          <Route path="about" element={<About />} />
          <Route path="services" element={<Service/>} />
          <Route path="waterutility"  element={<WaterUtilitys/>} />
          <Route path = "contact" element= {<Contact/>} />
          <Route path="news" element={<News/>} />
          <Route path="news/detail" element={<NewsDetail/>} />
          <Route path = "researches" element={<Researches/>} />
          <Route path="vaccancy" element={<Vaccancy/>} />
          <Route path="waterutility/detail" element={<WaterUtilityDetail/>}/>
          <Route path="forum" element={<ForumDetail/>}/>
          <Route path="vaccancy" element={<Vaccancy/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
