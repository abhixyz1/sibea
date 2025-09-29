# SIBEA - Sistem Informasi Beasiswa Daerah Kota Malang

Platform digital untuk mengelola program beasiswa daerah dengan sistem pendukung keputusan menggunakan metode AHP (Analytic Hierarchy Process) dan SAW (Simple Additive Weighting) untuk perankingan yang objektif dan transparan.

## 🚀 Fitur Utama

- **Manajemen Beasiswa**: CRUD program beasiswa dengan kriteria fleksibel
- **DSS AHP**: Matrix editor untuk perbandingan berpasangan dan perhitungan bobot
- **DSS SAW**: Normalisasi nilai dan perankingan otomatis
- **Role-based Access Control**: Admin, Operator, Verifikator, Siswa, dan Auditor
- **Audit Trail**: Pencatatan lengkap aktivitas sistem
- **Responsive UI**: Modern, elegant, dan mobile-first
- **Real-time Updates**: Live notifications dan status updates

## 🏗️ Arsitektur

### Monorepo Structure
```
sibea/
├── apps/
│   ├── web/          # React + Vite frontend
│   └── api/          # NestJS backend
├── packages/
│   └── shared/       # Shared types & schemas
└── docker-compose.yml
```

### Tech Stack

**Frontend (apps/web)**
- React 18 + TypeScript
- Vite untuk bundling
- Tailwind CSS + shadcn/ui
- React Router untuk routing
- TanStack Query untuk data fetching
- React Hook Form + Zod untuk form handling
- Recharts untuk visualisasi
- Framer Motion untuk animasi

**Backend (apps/api)**
- NestJS + TypeScript
- Prisma ORM + PostgreSQL
- JWT authentication
- Swagger documentation
- Rate limiting & security
- File upload support

**Shared (packages/shared)**
- Zod schemas untuk validasi
- TypeScript interfaces
- Konstanta AHP/SAW

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- pnpm 8+
- Docker & Docker Compose

### Quick Start

1. **Clone dan install dependencies**
```bash
git clone <repository-url>
cd sibea
pnpm install
```

2. **Setup database**
```bash
# Start PostgreSQL with Docker
docker-compose up -d postgres

# Copy environment file
cp .env.example .env

# Edit .env dengan konfigurasi yang sesuai
```

3. **Setup database schema**
```bash
# Generate Prisma client
pnpm --filter api db:generate

# Run migrations
pnpm --filter api db:migrate

# Seed initial data
pnpm --filter api db:seed
```

4. **Start development servers**
```bash
# Start both frontend and backend
pnpm dev

# Or start individually
pnpm --filter web dev    # Frontend: http://localhost:5173
pnpm --filter api dev    # Backend: http://localhost:3000
```

### Environment Variables

**Backend (.env)**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/sibea_db"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
JWT_EXPIRATION="1h"
JWT_REFRESH_EXPIRATION="7d"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
```

**Frontend**
```env
VITE_API_URL="http://localhost:3000/api"
```

## 📖 API Documentation

Setelah menjalankan backend, dokumentasi Swagger tersedia di:
- Development: http://localhost:3000/api/docs

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Backend tests
pnpm --filter api test

# Frontend tests  
pnpm --filter web test

# E2E tests
pnpm test:e2e
```

## 🚀 Production Deployment

### Build
```bash
# Build all packages
pnpm build

# Build shared package first
pnpm --filter shared build

# Build API
pnpm --filter api build

# Build Web
pnpm --filter web build
```

### Database Migration
```bash
# Production migration
pnpm --filter api db:migrate
```

### Deployment Options

**Frontend (Vercel/Netlify)**
- Build command: `pnpm --filter web build`
- Output directory: `apps/web/dist`

**Backend (Railway/Fly.io/Render)**
- Build command: `pnpm --filter api build`
- Start command: `pnpm --filter api start:prod`

**Database**
- Neon, Supabase, atau managed PostgreSQL

## 🔐 Default Accounts

Setelah seeding, gunakan akun berikut untuk testing:

**Admin**
- Email: admin@sibea.com
- Password: admin123

**Operator**  
- Email: operator@sibea.com
- Password: operator123

**Siswa (contoh)**
- Email: siswa1@example.com
- Password: student1123

## 📊 AHP & SAW Implementation

### AHP (Analytic Hierarchy Process)
- Pairwise comparison matrix dengan skala Saaty 1-9
- Perhitungan eigenvector untuk bobot kriteria
- Consistency Ratio validation (CR ≤ 0.1)
- Auto-reciprocal matrix filling

### SAW (Simple Additive Weighting)
- Normalisasi untuk kriteria benefit dan cost
- Benefit: r_ij = x_ij / max(x_ij)
- Cost: r_ij = min(x_ij) / x_ij
- Final score: S_i = Σ(w_j × r_ij)

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Kota Malang untuk requirements dan domain knowledge
- shadcn/ui untuk komponen UI yang excellent
- NestJS dan React communities untuk ecosystem yang luar biasa

