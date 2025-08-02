import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import YoutubeDownloader from './pages/YoutubeDownloader';

import './App.css';


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="app-container">
        <Header/>
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/converter" element={<YoutubeDownloader />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
