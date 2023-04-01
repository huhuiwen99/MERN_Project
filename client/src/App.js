import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Error, Register, ProtectedRoute } from './pages';
import AddJob from "./pages/dashboard/AddJob.js";
import AllJobs from "./pages/dashboard/AllJobs.js";
import Stats from "./pages/dashboard/Stats.js";
import Profile from "./pages/dashboard/Profile.js";
import SharedLayout from "./pages/dashboard/SharedLayout.js";
// import { AddJob, AllJobs, Stats, Profile, SharedLayout } from './pages/dashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><SharedLayout /></ProtectedRoute>}>
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
