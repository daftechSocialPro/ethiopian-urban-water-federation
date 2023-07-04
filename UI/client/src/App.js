import Footer from "./common/components/Footer";
import Header from "./common/components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./common/components/Layout";
import About from "./pages/About";
import Home from "./pages/Home";
import Service from "./pages/Service";
import BoardMembers from "./pages/BoardMembers";
import Contact from "./pages/Contact";
import News from "./pages/News";
import Researches from "./pages/Researches";
import Vaccancy from "./pages/Vaccancy";
import NewsDetail from "./pages/NewsDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home/>}/>
          <Route path="about" element={<About />} />
          <Route path="services" element={<Service/>} />
          <Route path="team"  element={<BoardMembers/>} />
          <Route path = "contact" element= {<Contact/>} />
          <Route path="news" element={<News/>} />
          <Route path="news/detail" element={<NewsDetail/>} />
          <Route path = "researches" element={<Researches/>} />
          <Route path="vaccancy" element={<Vaccancy/>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
