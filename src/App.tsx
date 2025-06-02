import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme/ThemeContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MoodBoardPage from './pages/MoodBoardPage';
import InspirationPage from './pages/InspirationPage';
import DesignPage from './pages/DesignPage';
import MarketingTypePage from './pages/MarketingTypePage';
import PlansPage from './pages/PlansPage';
import ChatbotPage from './pages/ChatbotPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  // Set page title
  useEffect(() => {
    document.title = 'MarketMate - Smart Marketing Assistant';
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="mood-board" element={<MoodBoardPage />} />
            <Route path="inspiration" element={<InspirationPage />} />
            <Route path="design" element={<DesignPage />} />
            <Route path="marketing-type" element={<MarketingTypePage />} />
            <Route path="plans" element={<PlansPage />} />
            <Route path="chatbot" element={<ChatbotPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;