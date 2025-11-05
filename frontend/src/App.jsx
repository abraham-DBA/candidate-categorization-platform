import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import AddCandidate from './pages/AddCandidate';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/register-candidate" element={<AddCandidate />} />
        </Routes>

        {/* Add the Toaster here */}
        <Toaster position="top-right" reverseOrder={false} />
      </Layout>
    </Router>
  );
};

export default App;
