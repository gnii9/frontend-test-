import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import FlashcardPage from './pages/FlashcardPage';
import ProgressPage from './pages/ProgressPage';
import QuizPage from './pages/QuizPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LearningChatPage from './pages/LearningChatPage';
import NotificationPage from './pages/NotificationPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import StatisticsPage from './pages/StatisticsPage';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPasswordPage from './pages/ForgotPasswordPage';


function App() {
  return (
    <>
      <Header />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flashcard" element={<FlashcardPage />} />
          <Route path="/practice" element={<LearningChatPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/quiz/:topicId" element={<QuizPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
