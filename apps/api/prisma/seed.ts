import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await argon2.hash('admin123')
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sibea.com' },
    update: {},
    create: {
      email: 'admin@sibea.com',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created')

  // Create operator user
  const operatorPassword = await argon2.hash('operator123')
  const operator = await prisma.user.upsert({
    where: { email: 'operator@sibea.com' },
    update: {},
    create: {
      email: 'operator@sibea.com',
      passwordHash: operatorPassword,
      role: 'OPERATOR',
    },
  })
  console.log('✅ Operator user created')

  // Create sample scholarship
  const scholarship = await prisma.scholarship.upsert({
    where: { id: 'scholarship-1' },
    update: {},
    create: {
      id: 'scholarship-1',
      name: 'Beasiswa Prestasi Siswa Malang 2024',
      description: 'Program beasiswa untuk siswa berprestasi di Kota Malang dengan kriteria akademik dan non-akademik.',
      periodStart: new Date('2024-01-01'),
      periodEnd: new Date('2024-12-31'),
      quota: 50,
      isActive: true,
      requirements: [
        'Warga Kota Malang',
        'Siswa SMA/SMK/MA aktif',
        'Nilai rata-rata minimal 80',
        'Tidak sedang menerima beasiswa lain',
        'Melampirkan surat keterangan tidak mampu'
      ],
    },
  })
  console.log('✅ Sample scholarship created')

  // Create criteria
  const criteria = await Promise.all([
    prisma.criterion.upsert({
      where: { id: 'criterion-1' },
      update: {},
      create: {
        id: 'criterion-1',
        scholarshipId: scholarship.id,
        name: 'Nilai Akademik',
        description: 'Rata-rata nilai rapor semester terakhir',
        type: 'BENEFIT',
        order: 1,
      },
    }),
    prisma.criterion.upsert({
      where: { id: 'criterion-2' },
      update: {},
      create: {
        id: 'criterion-2',
        scholarshipId: scholarship.id,
        name: 'Penghasilan Orang Tua',
        description: 'Total penghasilan orang tua per bulan',
        type: 'COST',
        order: 2,
      },
    }),
    prisma.criterion.upsert({
      where: { id: 'criterion-3' },
      update: {},
      create: {
        id: 'criterion-3',
        scholarshipId: scholarship.id,
        name: 'Prestasi Non-Akademik',
        description: 'Jumlah prestasi di bidang olahraga, seni, atau organisasi',
        type: 'BENEFIT',
        order: 3,
      },
    }),
    prisma.criterion.upsert({
      where: { id: 'criterion-4' },
      update: {},
      create: {
        id: 'criterion-4',
        scholarshipId: scholarship.id,
        name: 'Jarak Rumah ke Sekolah',
        description: 'Jarak tempuh dari rumah ke sekolah (km)',
        type: 'COST',
        order: 4,
      },
    }),
  ])
  console.log('✅ Sample criteria created')

  // Create sample students with profiles
  const students = []
  for (let i = 1; i <= 10; i++) {
    const studentPassword = await argon2.hash(`student${i}123`)
    const student = await prisma.user.upsert({
      where: { email: `siswa${i}@example.com` },
      update: {},
      create: {
        email: `siswa${i}@example.com`,
        passwordHash: studentPassword,
        role: 'SISWA',
        profileSiswa: {
          create: {
            nama: `Siswa Example ${i}`,
            nik: `3273${(Math.random() * 1000000000000).toString().padStart(12, '0')}`,
            tanggalLahir: new Date(2005 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
            tempatLahir: 'Malang',
            jenisKelamin: i % 2 === 0 ? 'P' : 'L',
            alamat: `Jalan Example ${i}, Malang`,
            noTelepon: `08${Math.floor(Math.random() * 1000000000).toString().padStart(10, '0')}`,
            namaSekolah: i <= 5 ? 'SMA Negeri 1 Malang' : 'SMK Negeri 2 Malang',
            jurusan: i <= 5 ? 'IPA' : 'Teknik Informatika',
            kelas: ['XI', 'XII'][Math.floor(Math.random() * 2)],
            tahunLulus: 2024 + Math.floor(Math.random() * 2),
            nilaiRataRata: 75 + Math.random() * 20, // 75-95
          },
        },
      },
    })
    students.push(student)
  }
  console.log('✅ Sample students created')

  // Create applications for some students
  const applications = []
  for (let i = 0; i < 8; i++) {
    const application = await prisma.application.upsert({
      where: { id: `application-${i + 1}` },
      update: {},
      create: {
        id: `application-${i + 1}`,
        userId: students[i].id,
        scholarshipId: scholarship.id,
        status: ['SUBMITTED', 'UNDER_REVIEW', 'VERIFIED'][Math.floor(Math.random() * 3)] as any,
        submittedAt: new Date(),
      },
    })
    applications.push(application)
  }
  console.log('✅ Sample applications created')

  // Create sample scores for applications
  for (const application of applications) {
    await Promise.all(criteria.map(async (criterion, index) => {
      let value: number
      switch (criterion.name) {
        case 'Nilai Akademik':
          value = 75 + Math.random() * 20 // 75-95
          break
        case 'Penghasilan Orang Tua':
          value = 2000000 + Math.random() * 8000000 // 2-10 juta
          break
        case 'Prestasi Non-Akademik':
          value = Math.floor(Math.random() * 6) // 0-5 prestasi
          break
        case 'Jarak Rumah ke Sekolah':
          value = 1 + Math.random() * 19 // 1-20 km
          break
        default:
          value = Math.random() * 100
      }

      await prisma.scoreRaw.upsert({
        where: {
          applicationId_criterionId: {
            applicationId: application.id,
            criterionId: criterion.id,
          },
        },
        update: {},
        create: {
          applicationId: application.id,
          criterionId: criterion.id,
          value,
        },
      })
    }))
  }
  console.log('✅ Sample scores created')

  // Create consistent AHP matrix (example with CR < 0.1)
  const ahpMatrix = [
    [1, 3, 5, 7],
    [1/3, 1, 3, 5],
    [1/5, 1/3, 1, 3],
    [1/7, 1/5, 1/3, 1]
  ]

  await prisma.ahpMatrix.upsert({
    where: { scholarshipId: scholarship.id },
    update: {},
    create: {
      scholarshipId: scholarship.id,
      size: 4,
      matrix: ahpMatrix,
      weights: [0.547, 0.277, 0.123, 0.053], // Pre-calculated weights
      lambdaMax: 4.08,
      consistencyIndex: 0.027,
      consistencyRatio: 0.03,
      isConsistent: true,
    },
  })

  // Create weights based on AHP results
  const weights = [
    { criterionId: criteria[0].id, value: 0.547 },
    { criterionId: criteria[1].id, value: 0.277 },
    { criterionId: criteria[2].id, value: 0.123 },
    { criterionId: criteria[3].id, value: 0.053 },
  ]

  for (const weight of weights) {
    await prisma.weight.upsert({
      where: {
        scholarshipId_criterionId: {
          scholarshipId: scholarship.id,
          criterionId: weight.criterionId,
        },
      },
      update: {},
      create: {
        scholarshipId: scholarship.id,
        criterionId: weight.criterionId,
        value: weight.value,
        method: 'AHP',
      },
    })
  }
  console.log('✅ AHP matrix and weights created')

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Database seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

