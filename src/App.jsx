import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import QuestionnairePage from './pages/QuestionnairePage';
import AnalysisPage from './pages/AnalysisPage';
import globalStyle, { appendedResponsive } from './styles/globalStyles';

export default function App() {
  const [quizAnswers, setQuizAnswers] = useState(null);

  

  return (
    <BrowserRouter>
  <style>{globalStyle + appendedResponsive}</style>
      <Header />

      <main style={{ paddingTop: 80 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage quizAnswers={quizAnswers} />} />
          <Route
            path="/questionnaire"
            element={<QuestionnairePage onSubmit={answers => setQuizAnswers(answers)} />}
          />
          <Route path="/analysis" element={<AnalysisPage quizAnswers={quizAnswers} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
