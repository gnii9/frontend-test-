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
import ProfilePage from './pages/ProfilePage';
import StatisticsPage from './pages/StatisticsPage';
import AdminDashboard from './pages/AdminDashboard';
import RequestEmailPage from './pages/RequestEmailPage';
import VerifyOtpPage from './pages/VerifyOTPPage';
import ResetPasswordPage from './pages/ResetPasswordPage'
import EditProfilePage from './pages/EditProfilePage';

function App() {
  return (
    <>
      <Header />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<RequestEmailPage />} />
          <Route path="/verifyOTP" element={<VerifyOtpPage/>}/>
          <Route path="/reset-password" element={<ResetPasswordPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/flashcard" element={<FlashcardPage />} />
          <Route path="/practice" element={<LearningChatPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/quiz/:topicId" element={<QuizPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage/>}/>
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
        </Routes>
      </div>
    </>
  );
}

export default App;
