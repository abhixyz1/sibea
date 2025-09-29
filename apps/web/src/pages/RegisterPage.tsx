import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Daftar</CardTitle>
          <CardDescription className="text-center">
            Buat akun SIBEA baru
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            Halaman pendaftaran akan segera tersedia.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

