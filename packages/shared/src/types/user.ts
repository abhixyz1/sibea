export enum UserRole {
  ADMIN = 'ADMIN',
  VERIFIKATOR = 'VERIFIKATOR',
  OPERATOR = 'OPERATOR',
  SISWA = 'SISWA',
  AUDITOR = 'AUDITOR'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  profileSiswa?: ProfileSiswa;
}

export interface ProfileSiswa {
  id: string;
  userId: string;
  nama: string;
  nik: string;
  tanggalLahir: Date;
  tempatLahir: string;
  jenisKelamin: 'L' | 'P';
  alamat: string;
  noTelepon: string;
  namaSekolah: string;
  jurusan: string;
  kelas: string;
  tahunLulus: number;
  nilaiRataRata: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser extends User {
  permissions: string[];
}

