import Home from "./Pages/Home";
import {BrowserRouter , Routes , Route , Navigate} from 'react-router-dom'
import Navbar from "./components/Navbar";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home/>: <Navigate to='/login' />} />
            <Route path="/login" element={!user ?  <Login/> :<Navigate to='/' />} />
            <Route path="/signup" element={!user ?  <SignUp/> :<Navigate to='/' />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
