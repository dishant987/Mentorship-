import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './pages/Navbar'
import Footer from './pages/Footer'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import MyProfile from './pages/MyProfile'
import PublicProfile from './pages/PublicProfile'
import Matching from './pages/Matching'

const App = () => {

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/profile/:userId" element={<PublicProfile />} />
            <Route path='/matching' element={<Matching />} />
            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />

      </div>
    </Router>
  )
}

export default App