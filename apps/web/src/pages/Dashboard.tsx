import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  FileCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Award,
  BookOpen,
  Bell,
  ArrowRight,
  Calendar,
  FileText,
  TrendingUp
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const statusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: React.ReactNode; text: string }> = {
      pending: { 
        color: 'bg-yellow-50 text-yellow-700 border-yellow-200', 
        icon: <Clock className="w-4 h-4" />, 
        text: 'Menunggu Verifikasi' 
      },
      review: { 
        color: 'bg-blue-50 text-blue-700 border-blue-200', 
        icon: <FileCheck className="w-4 h-4" />, 
        text: 'Dalam Peninjauan' 
      },
      approved: { 
        color: 'bg-green-50 text-green-700 border-green-200', 
        icon: <CheckCircle2 className="w-4 h-4" />, 
        text: 'Diterima' 
      },
      rejected: { 
        color: 'bg-red-50 text-red-700 border-red-200', 
        icon: <XCircle className="w-4 h-4" />, 
        text: 'Ditolak' 
      }
    }

    const config = statusConfig[status] || statusConfig.pending
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.color} font-medium text-sm`}>
        {config.icon}
        {config.text}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-government-blue to-government-blue/90 rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Selamat Datang di Portal SIBEA</h1>
            <p className="text-blue-100 text-lg">Sistem Informasi Beasiswa Daerah Kota Malang</p>
          </div>
          <div className="hidden md:block">
            <Award className="w-20 h-20 opacity-30" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Button asChild className="h-auto py-5 md:py-6 bg-white hover:bg-gray-50 text-government-blue border-2 border-government-blue shadow-md hover:shadow-xl transition-all">
          <Link to="/beasiswa" className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
              <div className="text-left">
                <div className="font-semibold text-sm md:text-base">Program Beasiswa</div>
                <div className="text-xs md:text-sm opacity-80">Lihat program tersedia</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </Button>

        <Button asChild className="h-auto py-5 md:py-6 bg-white hover:bg-gray-50 text-government-blue border-2 border-government-blue shadow-md hover:shadow-xl transition-all">
          <Link to="/beasiswa" className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <FileCheck className="w-5 h-5 md:w-6 md:h-6" />
              <div className="text-left">
                <div className="font-semibold text-sm md:text-base">Ajukan Permohonan</div>
                <div className="text-xs md:text-sm opacity-80">Daftar beasiswa baru</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </Button>

        <Button asChild className="h-auto py-5 md:py-6 bg-white hover:bg-gray-50 text-government-blue border-2 border-government-blue shadow-md hover:shadow-xl transition-all sm:col-span-2 lg:col-span-1">
          <Link to="#" className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 md:w-6 md:h-6" />
              <div className="text-left">
                <div className="font-semibold text-sm md:text-base">Riwayat Aplikasi</div>
                <div className="text-xs md:text-sm opacity-80">Cek status permohonan</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-gray-600">Program Tersedia</CardDescription>
              <BookOpen className="w-5 h-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-500">program</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-gray-600">Permohonan Aktif</CardDescription>
              <FileCheck className="w-5 h-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-500">aplikasi</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-yellow-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-gray-600">Menunggu Review</CardDescription>
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-500">dokumen</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-gray-600">Total Diterima</CardDescription>
              <CheckCircle2 className="w-5 h-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500">beasiswa</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Permohonan */}
      <Card className="shadow-lg">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Status Permohonan Terkini</CardTitle>
              <CardDescription className="mt-1">Pantau perkembangan permohonan beasiswa Anda</CardDescription>
            </div>
            <Button variant="outline" asChild className="hidden md:flex">
              <Link to="#">
                Lihat Semua
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {/* Application Item 1 */}
            <div className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">Beasiswa Prestasi Akademik 2025</h3>
                    {statusBadge('review')}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Diajukan: 15 September 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>Progress: Verifikasi dokumen oleh admin</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="#">Detail</Link>
                </Button>
              </div>
            </div>

            {/* Application Item 2 */}
            <div className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">Beasiswa Ekonomi Tidak Mampu 2025</h3>
                    {statusBadge('pending')}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Diajukan: 20 September 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>Progress: Menunggu verifikasi berkas</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="#">Detail</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pengumuman */}
      <Card className="shadow-lg border-t-4 border-t-government-blue">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-government-blue" />
            <div>
              <CardTitle className="text-xl">Pengumuman & Informasi</CardTitle>
              <CardDescription className="mt-1">Informasi terkini seputar program beasiswa</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Pendaftaran Beasiswa Semester Genap 2025 Dibuka!</h4>
                  <p className="text-sm text-gray-700">Pendaftaran program beasiswa semester genap akan dibuka mulai 1 Oktober 2025. Segera lengkapi berkas Anda.</p>
                  <p className="text-xs text-gray-500 mt-2">Diposting: 25 September 2025</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Pengumuman Hasil Seleksi Periode September</h4>
                  <p className="text-sm text-gray-700">Hasil seleksi penerima beasiswa periode September telah diumumkan. Cek status permohonan Anda di menu Riwayat Aplikasi.</p>
                  <p className="text-xs text-gray-500 mt-2">Diposting: 20 September 2025</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

