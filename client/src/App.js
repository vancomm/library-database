import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import First from './pages/First.js';
import Second from './pages/Second.js';
import Navigation from './components/Navigation.js';
import Patrons from './pages/Patrons.js';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/first" element={<First />} />
        <Route path="/second" element={<Second />} />
        <Route path="/patrons" element={<Patrons />} />
      </Routes>
    </>
  );
}

export default App;
