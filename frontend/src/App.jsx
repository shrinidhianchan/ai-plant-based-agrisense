// src/App.jsx (CRITICAL FIX: Remove BrowserRouter)
import "./global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// 👇 1. REMOVE BrowserRouter from imports
import { Routes, Route } from "react-router-dom"; 
import Navigation from "@/components/Navigation";
import Index from "./pages/index";
import Analyze from "./pages/Analyze";
import Feedback from './pages/Feedback';
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* 👇 2. REMOVE the BrowserRouter component entirely */}
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  </QueryClientProvider>
);

export default App;