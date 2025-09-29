import { Outlet } from 'react-router-dom'
import Logo from '@/components/Logo'

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo size="md" showText={false} />
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

