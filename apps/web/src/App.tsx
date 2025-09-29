import { Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'

// Pages
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardLayout from '@/layouts/DashboardLayout'
import Dashboard from '@/pages/Dashboard'
import BeasiswaList from '@/pages/BeasiswaList'
import BeasiswaDetail from '@/pages/BeasiswaDetail'
import AdminLayout from '@/layouts/AdminLayout'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminBeasiswa from '@/pages/admin/AdminBeasiswa'
import AdminKriteria from '@/pages/admin/AdminKriteria'
import AdminAHP from '@/pages/admin/AdminAHP'
import AdminSAW from '@/pages/admin/AdminSAW'
import AdminHasil from '@/pages/admin/AdminHasil'

// Auth
import { AuthProvider } from '@/providers/AuthProvider'
import ProtectedRoute from '@/components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Student Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['SISWA']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="beasiswa" element={<BeasiswaList />} />
          <Route path="beasiswa/:id" element={<BeasiswaDetail />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'OPERATOR', 'VERIFIKATOR']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="beasiswa" element={<AdminBeasiswa />} />
          <Route path="kriteria" element={<AdminKriteria />} />
          <Route path="ahp" element={<AdminAHP />} />
          <Route path="saw" element={<AdminSAW />} />
          <Route path="hasil" element={<AdminHasil />} />
        </Route>
      </Routes>
      
      <Toaster />
    </AuthProvider>
  )
}

export default App

