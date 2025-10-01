import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Award, 
  BookOpen, 
  Shield, 
  Star,
  ArrowRight,
  Check,
  MapPin,
  Phone,
  Mail,
  Building,
  FileCheck,
  Clock,
  BadgeCheck
} from 'lucide-react'
import Logo from '@/components/Logo'

export default function LandingPage() {
  const benefits = [
    "Proses seleksi yang objektif dan transparan",
    "Manajemen data terpusat dan terintegrasi", 
    "Laporan analitik real-time",
    "Notifikasi otomatis untuk semua tahapan",
    "Dashboard monitoring untuk admin",
    "Export data dan sertifikat digital"
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-government-blue/20 shadow-sm">
        <div className="bg-government-blue text-white py-1">
          <div className="container mx-auto px-4 text-center text-sm">
            <span className="font-medium">🏛️ Portal Resmi Pemerintah Kota Malang</span>
          </div>
        </div>
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo size="lg" showText={true} />
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild className="text-government-blue hover:text-government-blue/80 font-medium">
              <Link to="/login">Portal Masuk</Link>
            </Button>
            <Button asChild className="bg-government-blue hover:bg-government-blue/90 font-medium">
              <Link to="/register">Daftar Beasiswa</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-white via-slate-50 to-blue-50 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-15">
          <img 
            src="/images/balai-kota-malang.jpg" 
            alt="Balai Kota Malang" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(30, 58, 138, 0.1) 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Government Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-government-blue/10 border border-government-blue/20 text-government-blue rounded-full text-sm font-semibold mb-8">
              <Building className="w-4 h-4 mr-2" />
              Portal Resmi Pemerintah Kota Malang
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-8 leading-tight">
              Sistem Informasi Beasiswa 
              <span className="text-government-blue block mt-2">Kota Malang</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Platform digital terintegrasi untuk pengelolaan program beasiswa daerah dengan 
              <span className="text-government-blue font-semibold"> transparansi penuh</span> dan 
              <span className="text-government-blue font-semibold"> sistem penilaian objektif</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" asChild className="bg-government-blue hover:bg-government-blue/80 px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all">
                <Link to="/register" className="flex items-center text-white">
                  <FileCheck className="mr-3 w-5 h-5" />
                  Ajukan Permohonan Beasiswa
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" asChild className="bg-white border-2 border-government-blue text-government-blue hover:bg-government-blue hover:text-white px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all">
                <Link to="/login" className="flex items-center">
                  <Users className="mr-3 w-5 h-5" />
                  Portal Pemohon
                </Link>
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-government-blue/20 shadow-lg hover:shadow-xl hover:border-government-blue/40 transition-all">
                <Users className="w-8 h-8 text-government-blue mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Total Pendaftar</h3>
                <p className="text-3xl font-bold text-government-blue mb-1 text-center">1,500+</p>
                <p className="text-gray-600 text-sm text-center">Pemohon beasiswa aktif</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-green-200 shadow-lg hover:shadow-xl hover:border-green-400 transition-all">
                <BadgeCheck className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Penerima Beasiswa</h3>
                <p className="text-3xl font-bold text-green-600 mb-1 text-center">892</p>
                <p className="text-gray-600 text-sm text-center">Mahasiswa yang diterima</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-orange-200 shadow-lg hover:shadow-xl hover:border-orange-400 transition-all sm:col-span-2 lg:col-span-1">
                <Award className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Program Aktif</h3>
                <p className="text-3xl font-bold text-orange-600 mb-1 text-center">25</p>
                <p className="text-gray-600 text-sm text-center">Program beasiswa tersedia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alur Pendaftaran */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Alur Pendaftaran Beasiswa
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proses pendaftaran yang mudah dan transparan dalam 4 langkah sederhana
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border-2 border-government-blue/20 hover:border-government-blue transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl lg:text-2xl font-bold mb-4 lg:mb-6 shadow-lg">
                      1
                    </div>
                    <FileCheck className="w-10 h-10 lg:w-12 lg:h-12 text-blue-600 mb-3 lg:mb-4" />
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">Registrasi</h3>
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                      Buat akun dan lengkapi profil data diri Anda
                    </p>
                  </div>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-government-blue" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border-2 border-government-blue/20 hover:border-government-blue transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xl lg:text-2xl font-bold mb-4 lg:mb-6 shadow-lg">
                      2
                    </div>
                    <BookOpen className="w-10 h-10 lg:w-12 lg:h-12 text-green-600 mb-3 lg:mb-4" />
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">Pilih Program</h3>
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                      Pilih program beasiswa yang sesuai dengan kebutuhan
                    </p>
                  </div>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-government-blue" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border-2 border-government-blue/20 hover:border-government-blue transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xl lg:text-2xl font-bold mb-4 lg:mb-6 shadow-lg">
                      3
                    </div>
                    <FileCheck className="w-10 h-10 lg:w-12 lg:h-12 text-orange-600 mb-3 lg:mb-4" />
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">Upload Dokumen</h3>
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                      Lengkapi dan upload semua dokumen persyaratan
                    </p>
                  </div>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-government-blue" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border-2 border-government-blue/20 hover:border-government-blue transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl lg:text-2xl font-bold mb-4 lg:mb-6 shadow-lg">
                    4
                  </div>
                  <Clock className="w-10 h-10 lg:w-12 lg:h-12 text-purple-600 mb-3 lg:mb-4" />
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">Monitoring</h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    Pantau status permohonan melalui dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                Pemerintah Kota Malang
                <span className="block text-government-blue">Melayani dengan Hati</span>
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Sebagai kota yang berkomitmen tinggi terhadap pendidikan dan kesejahteraan masyarakat, 
                Pemerintah Kota Malang menghadirkan SIBEA - sistem beasiswa digital yang mengedepankan 
                transparansi, akuntabilitas, dan kemudahan akses bagi seluruh warga Malang.
              </p>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-government-blue/5 to-government-blue/10 p-6 rounded-lg border-l-4 border-government-blue">
                  <h4 className="font-semibold text-government-blue mb-2 text-lg">Visi Kota Malang</h4>
                  <p className="text-gray-700">"Terwujudnya Kota Malang sebagai Kota Pendidikan yang Unggul, Berkarakter, dan Berdaya Saing"</p>
                </div>
                <div className="bg-gradient-to-r from-government-blue/5 to-government-blue/10 p-6 rounded-lg border-l-4 border-government-blue">
                  <h4 className="font-semibold text-government-blue mb-2 text-lg">Komitmen Beasiswa</h4>
                  <p className="text-gray-700">Memberikan akses pendidikan berkualitas dan merata untuk seluruh masyarakat Kota Malang</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <img 
                src="/images/balai-kota-malang.jpg" 
                alt="Balai Kota Malang" 
                className="w-full h-96 object-cover rounded-2xl shadow-xl border border-government-blue/20 group-hover:shadow-2xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-government-blue/30 via-transparent to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-2xl font-bold drop-shadow-lg mb-2">Balai Kota Malang</h4>
                <p className="text-base font-medium opacity-95 drop-shadow-md">Pusat Pemerintahan Kota Malang</p>
                <p className="text-sm opacity-90 drop-shadow-md mt-1">Melayani dengan Integritas dan Transparansi</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Program Beasiswa Tersedia
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Berbagai program beasiswa untuk mendukung pendidikan masyarakat Kota Malang
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Program 1 */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 lg:p-8 shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="mb-6">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Beasiswa Prestasi</h3>
                <p className="text-sm text-blue-600 font-semibold mb-4">Program Unggulan</p>
              </div>
              <p className="text-sm lg:text-base text-gray-700 mb-6 leading-relaxed">
                Diberikan kepada pelajar/mahasiswa dengan prestasi akademik yang membanggakan
              </p>
              <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 transition-colors">
                <Link to="/beasiswa">Lihat Detail</Link>
              </Button>
            </div>

            {/* Program 2 */}
            <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-6 lg:p-8 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="mb-6">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Beasiswa Ekonomi</h3>
                <p className="text-sm text-green-600 font-semibold mb-4">Bantuan Pendidikan</p>
              </div>
              <p className="text-sm lg:text-base text-gray-700 mb-6 leading-relaxed">
                Untuk siswa/mahasiswa dari keluarga kurang mampu yang membutuhkan bantuan biaya pendidikan
              </p>
              <Button asChild className="w-full bg-green-500 hover:bg-green-600 transition-colors">
                <Link to="/beasiswa">Lihat Detail</Link>
              </Button>
            </div>

            {/* Program 3 */}
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-6 lg:p-8 shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="mb-6">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Beasiswa Khusus</h3>
                <p className="text-sm text-purple-600 font-semibold mb-4">Program Spesial</p>
              </div>
              <p className="text-sm lg:text-base text-gray-700 mb-6 leading-relaxed">
                Program khusus untuk kategori tertentu seperti difabel, yatim/piatu, dan lainnya
              </p>
              <Button asChild className="w-full bg-purple-500 hover:bg-purple-600 transition-colors">
                <Link to="/beasiswa">Lihat Detail</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Government Commitment */}
      <section className="py-20 bg-gradient-to-br from-government-blue/5 to-government-blue/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                Komitmen Pemerintah Kota Malang
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Sistem Informasi Beasiswa Daerah (SIBEA) merupakan wujud komitmen nyata Pemerintah Kota Malang 
                dalam memberikan akses pendidikan yang adil dan merata bagi seluruh masyarakat.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-government-blue/10">
                    <div className="flex-shrink-0 w-8 h-8 bg-government-blue/10 rounded-full flex items-center justify-center mr-4 mt-0.5">
                      <Check className="w-5 h-5 text-government-blue" />
                    </div>
                    <span className="text-gray-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-government-blue to-government-blue/90 rounded-xl p-8 text-white shadow-xl">
                <div className="text-center mb-6">
                  <img 
                    src="/images/logo-malang.png" 
                    alt="Logo Kota Malang" 
                    className="h-16 w-16 mx-auto mb-4 bg-white rounded-full p-2"
                  />
                  <h3 className="text-2xl font-bold mb-2">Mulai Permohonan</h3>
                  <p className="opacity-90 mb-6">
                    Akses mudah dan cepat untuk mengajukan permohonan beasiswa pendidikan melalui 
                    sistem digital yang terintegrasi.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button asChild className="w-full bg-white text-government-blue hover:bg-gray-100 font-semibold py-3">
                    <Link to="/register" className="flex items-center justify-center">
                      <FileCheck className="mr-2 w-5 h-5" />
                      Ajukan Permohonan Beasiswa
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold py-3 shadow-lg">
                    <Link to="/login" className="flex items-center justify-center">
                      <Users className="mr-2 w-5 h-5" />
                      Cek Status Permohonan
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                Hubungi Kami
              </h2>
              <p className="text-xl text-gray-600">
                Ada pertanyaan? Tim kami siap membantu Anda
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-government-blue to-government-blue/90 p-8 rounded-xl text-white shadow-lg">
                  <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-1">Alamat</p>
                        <p className="text-blue-100">Jl. Tugu No. 1, Malang 65119<br />Jawa Timur, Indonesia</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-1">Telepon</p>
                        <p className="text-blue-100">(0341) 551-611</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-1">Email</p>
                        <p className="text-blue-100">beasiswa@malangkota.go.id</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-1">Jam Pelayanan</p>
                        <p className="text-blue-100">Senin - Jumat: 08:00 - 16:00 WIB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-xl border border-government-blue/20 shadow-lg">
                <form className="space-y-5" onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const name = formData.get('name')
                  const email = formData.get('email')
                  const subject = formData.get('subject')
                  const message = formData.get('message')
                  
                  // Create mailto link
                  const mailtoLink = `mailto:beasiswa@malangkota.go.id?subject=${encodeURIComponent(subject as string)}&body=${encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`)}`
                  window.location.href = mailtoLink
                }}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-blue focus:border-transparent transition-all"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-blue focus:border-transparent transition-all"
                      placeholder="nama@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                      Subjek <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-blue focus:border-transparent transition-all"
                    >
                      <option value="">-- Pilih Subjek --</option>
                      <option value="Informasi Program Beasiswa">Informasi Program Beasiswa</option>
                      <option value="Pendaftaran Beasiswa">Pendaftaran Beasiswa</option>
                      <option value="Status Permohonan">Status Permohonan</option>
                      <option value="Teknis Sistem">Bantuan Teknis Sistem</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                      Pesan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-blue focus:border-transparent transition-all resize-none"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-government-blue hover:bg-government-blue/90 py-6 text-lg font-semibold"
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    Kirim Pesan
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-government-blue text-white py-16">
        <div className="container mx-auto px-4">
          {/* Government Header */}
          <div className="text-center mb-12 pb-8 border-b border-white/20">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <img src="/images/logo-malang.png" alt="Logo Kota Malang" className="h-16 w-16 object-contain bg-white rounded-full p-2" />
              <div className="text-left">
                <h3 className="text-2xl font-serif font-bold">Pemerintah Kota Malang</h3>
                <p className="text-blue-100">Sistem Informasi Beasiswa Daerah</p>
              </div>
            </div>
            <p className="text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Portal resmi Pemerintah Kota Malang untuk pengelolaan program beasiswa daerah 
              yang transparan, akuntabel, dan berorientasi pada kepentingan masyarakat.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 text-lg">Layanan Publik</h4>
              <ul className="space-y-3 text-blue-100">
                <li><Link to="/register" className="hover:text-white transition-colors flex items-center"><FileCheck className="w-4 h-4 mr-2" />Permohonan Beasiswa</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors flex items-center"><Users className="w-4 h-4 mr-2" />Portal Pemohon</Link></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><BookOpen className="w-4 h-4 mr-2" />Panduan & Tutorial</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Shield className="w-4 h-4 mr-2" />Kebijakan Privasi</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Informasi</h4>
              <ul className="space-y-3 text-blue-100">
                <li><a href="#" className="hover:text-white transition-colors">Jenis Beasiswa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Persyaratan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Jadwal Pendaftaran</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Kontak Resmi</h4>
              <div className="space-y-3 text-blue-100">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Balai Kota Malang</p>
                    <p className="text-sm">Jl. Tugu No. 1, Malang 65119</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3" />
                  <span>(0341) 551-611</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  <span>beasiswa@malangkota.go.id</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Media Sosial</h4>
              <div className="space-y-3">
                <a href="#" className="flex items-center text-blue-100 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-xs font-bold">FB</span>
                  </div>
                  @PemkotMalang
                </a>
                <a href="#" className="flex items-center text-blue-100 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-xs font-bold">IG</span>
                  </div>
                  @malangkota
                </a>
                <a href="#" className="flex items-center text-blue-100 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-xs font-bold">YT</span>
                  </div>
                  Pemkot Malang TV
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-blue-100">
              <p>&copy; 2024 Pemerintah Kota Malang. Seluruh hak cipta dilindungi undang-undang.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
                <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
                <a href="#" className="hover:text-white transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

