import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CombinedSheet from './components/CombinedSheet/CombinedSheet';
import CyanneSheet from './components/CyanneSheet/CyanneSheet';
import AmandaSheet from './components/AmandaSheet/AmandaSheet';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="relative w-screen h-screen overflow-hidden bg-gray-800">
        <nav className="bg-blue-800 text-white p-4">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:underline font-medium">Home</Link>
            </li>
            <li>
              <Link to="/combined" className="hover:underline font-medium">Wawro's Sheet</Link>
            </li>
            <li>
              <Link to="/cyanne" className="hover:underline font-medium">Cyanne's Sheet</Link>
            </li>
            <li>
              <Link to="/amanda" className="hover:underline font-medium">Amanda's Sheet</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/combined" element={<CombinedSheet />} />
          <Route path="/cyanne" element={<CyanneSheet />} />
          <Route path="/amanda" element={<AmandaSheet />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;