import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterUser from './pages/auth/registerUser';
import Login from './pages/auth/login';
import Home from './pages/home';
import AppLayout from './layout/appLayOut';
import ProtectedRoutes from './routes/protectedRoutes';
import PublicRoutes from './routes/publicRoutes';
import WorkspaceLayout from './pages/workspace/workSpaceLayout';
import TeamMember from './pages/workspace/teammember';
import { ProjectsPage } from './pages/projects/ProjectPage';
import { ProjectBoardPage } from './pages/statuses/ProjectBoardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public Routes (Login & Register) */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterUser />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route path="/orgs/:orgSlug" element={<WorkspaceLayout />}>
            <Route path="" element={<Navigate to="projects" replace />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:projectId" element={<ProjectBoardPage />} />
            <Route path="members" element={<TeamMember />} />
          </Route>


          <Route path="*" element={<p className="text-stone-500">Coming soon.</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
