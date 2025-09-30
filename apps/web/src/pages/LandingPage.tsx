import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  GraduationCap, 
  Users, 
  Award, 
  TrendingUp, 
  BookOpen, 
  Target, 
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
  const stats = [
    { number: "1,500+", label: "Penerima Beasiswa", icon: Users },
    { number: "25+", label: "Program Beasiswa", icon: Award },
    { number: "95%", label: "Tingkat Kepuasan", icon: Star },
    { number: "100%", label: "Transparansi", icon: Shield }
  ]

  const features = [
    {
      icon: BookOpen,
      title: "Pendaftaran Online",
      description: "Daftar beasiswa dengan mudah melalui platform digital yang user-friendly",
      color: "bg-blue-500"
    },
    {
      icon: Target,
      title: "Sistem Seleksi AHP",
      description: "Metode Analytical Hierarchy Process untuk ranking yang objektif dan akurat",
      color: "bg-green-500"
    },
    {
      icon: TrendingUp,
      title: "Analisa SAW",
      description: "Simple Additive Weighting untuk evaluasi multi-kriteria yang komprehensif",
      color: "bg-purple-500"
    },
    {
      icon: Shield,
      title: "Audit Trail",
      description: "Jejak audit lengkap untuk transparansi dan akuntabilitas proses seleksi",
      color: "bg-orange-500"
    }
  ]

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
              <Button size="lg" asChild className="bg-government-blue hover:bg-government-blue/90 px-10 py-6 text-lg font-semibold shadow-lg">
                <Link to="/register" className="flex items-center">
                  <FileCheck className="mr-3 w-5 h-5" />
                  Ajukan Permohonan Beasiswa
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-2 border-government-blue text-government-blue hover:bg-government-blue hover:text-white px-10 py-6 text-lg font-semibold">
                <Link to="/login" className="flex items-center">
                  <Users className="mr-3 w-5 h-5" />
                  Portal Pemohon
                </Link>
              </Button>
            </div>
            
            {/* Government Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-government-blue/20 shadow-md">
                <Clock className="w-8 h-8 text-government-blue mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Pelayanan 24/7</h3>
                <p className="text-gray-600 text-sm">Akses kapan saja melalui platform digital</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-government-blue/20 shadow-md">
                <BadgeCheck className="w-8 h-8 text-government-blue mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Terverifikasi Resmi</h3>
                <p className="text-gray-600 text-sm">Dikelola langsung oleh Pemkot Malang</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-government-blue/20 shadow-md">
                <Shield className="w-8 h-8 text-government-blue mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Data Terlindungi</h3>
                <p className="text-gray-600 text-sm">Keamanan data dengan standar pemerintah</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Pencapaian Program Beasiswa Kota Malang
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Data terkini hasil implementasi sistem beasiswa digital yang transparan dan akuntabel
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md border border-government-blue/10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-government-blue/10 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-government-blue" />
                </div>
                <div className="text-3xl font-bold text-government-blue mb-2">{stat.number}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
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
              Fitur Unggulan Sistem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Teknologi terdepan dengan metodologi ilmiah untuk proses seleksi beasiswa yang objektif dan transparan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-government-blue/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-slate-50">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-government-blue rounded-xl mb-4 mx-auto shadow-md">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
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
                  <Button variant="outline" asChild className="w-full border-white text-white hover:bg-white hover:text-government-blue font-semibold py-3">
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

