import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import ScrollToTop from '@components/ui/ScrollToTop'
import Home from '@pages/Home'
import About from '@pages/About'
import Programs from '@pages/Programs'
import Volunteer from '@pages/Volunteer'
import Membership from '@pages/Membership'
import Partner from '@pages/Partner'
import Events from '@pages/Events'
import Gallery from '@pages/Gallery'
import Blog from '@pages/Blog'
import Contact from '@pages/Contact'
import Donate from '@pages/Donate'

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
