import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Layout from './components/Layout';
import Home from './pages/Home';
import Guide from './pages/Guide';
import Packages from './pages/Packages';
import Addons from './pages/Addons';
import Checkout from './pages/Checkout';
import Policy from './pages/Policy';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a slightly longer timeout than the loader's internal timer
    // to ensure smooth transition
    const timer = setTimeout(() => setLoading(false), 4800);
    return () => clearTimeout(timer);
  }, []);

  // Show loading screen first
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="guide" element={<Guide />} />
          <Route path="packages" element={<Packages />} />
          <Route path="addons" element={<Addons />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="policy" element={<Policy />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
