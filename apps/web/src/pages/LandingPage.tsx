import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Users, Award, TrendingUp } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">SIBEA</span>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Masuk</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Daftar</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Sistem Informasi Beasiswa Daerah
          <span className="block text-blue-600">Kota Malang</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Platform digital untuk mengelola program beasiswa daerah dengan sistem pendukung keputusan 
          menggunakan metode AHP dan SAW untuk perankingan yang objektif dan transparan.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link to="/register">Daftar Sekarang</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/login">Masuk</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Fitur Unggulan
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Manajemen Siswa</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Sistem pendaftaran dan verifikasi data siswa yang terintegrasi
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Award className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Multi Beasiswa</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Kelola berbagai program beasiswa dengan kriteria yang fleksibel
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>DSS AHP/SAW</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Perankingan otomatis menggunakan metode ilmiah yang objektif
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <GraduationCap className="h-10 w-10 text-orange-600 mb-2" />
              <CardTitle>Transparansi</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Proses seleksi yang transparan dengan audit trail lengkap
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 SIBEA - Sistem Informasi Beasiswa Daerah Kota Malang</p>
        </div>
      </footer>
    </div>
  )
}

