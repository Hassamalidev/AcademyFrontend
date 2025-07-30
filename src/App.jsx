import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import TestPage from "./pages/TestPage";
import Contact from "./pages/Contact";
import BMI from "./pages/BMI";
import News from "./pages/News";
import Login from "./pages/Login";
import LearnMore from "./pages/LearnMore";
import CategorySelection from "./pages/CategorySelection";
import Courses from "./pages/Courses";
import Signup from "./pages/Signup"

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Routes>
           <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/courses/category-selection" element={<CategorySelection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bmi" element={<BMI />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="/learn-more" element={<LearnMore />} />
         
          <Route path="/category-selection" element={<CategorySelection />} />
          <Route path="/test/:categoryId" element={<TestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;