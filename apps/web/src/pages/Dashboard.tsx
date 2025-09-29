import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Beasiswa Tersedia</CardTitle>
            <CardDescription>Program beasiswa yang dapat diikuti</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Aplikasi Saya</CardTitle>
            <CardDescription>Aplikasi beasiswa yang telah diajukan</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Status aplikasi terbaru</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-600">Under Review</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

