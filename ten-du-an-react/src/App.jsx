  import { Routes, Route } from 'react-router-dom';
  import Header from './components/common/Header';
  import Footer from './components/common/Footer';
  import Home from './pages/Home';
  import PracticePage from './pages/PracticePage';
  import LearningChatPage from './pages/LearningChatPage';
  import CoursesPage from './pages/CoursesPage';
  import AboutPage from './pages/AboutPage';
  import ContactPage from './pages/ContactPage';
  import { AuthProvider } from './context/AuthContext';
  import { ThemeProvider } from './context/ThemeContext';
  import ProfilePage from './pages/ProfilePage';
  import LoginPage from './pages/LoginPage';
  import RegisterPage from './pages/RegisterPage';

  export default function App() {
    return (
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/practice" element={<PracticePage />} />
                <Route path="/chat" element={<LearningChatPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </ThemeProvider>
    );
  }