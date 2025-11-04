import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Overview from './pages/Candidates';
import Chat from './pages/AddCandidate';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/candidates" element={<Overview />} />
          <Route path="/register-candidate" element={<Chat />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;