import { z } from 'zod';
import { UserRole } from '../types/user';

export const createUserSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  role: z.nativeEnum(UserRole)
});

export const updateUserSchema = z.object({
  email: z.string().email('Email tidak valid').optional(),
  role: z.nativeEnum(UserRole).optional()
});

export const profileSiswaSchema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi'),
  nik: z.string().length(16, 'NIK harus 16 digit'),
  tanggalLahir: z.coerce.date(),
  tempatLahir: z.string().min(1, 'Tempat lahir wajib diisi'),
  jenisKelamin: z.enum(['L', 'P'], {
    errorMap: () => ({ message: 'Jenis kelamin harus L atau P' })
  }),
  alamat: z.string().min(1, 'Alamat wajib diisi'),
  noTelepon: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  namaSekolah: z.string().min(1, 'Nama sekolah wajib diisi'),
  jurusan: z.string().min(1, 'Jurusan wajib diisi'),
  kelas: z.string().min(1, 'Kelas wajib diisi'),
  tahunLulus: z.number().min(2020).max(2030),
  nilaiRataRata: z.number().min(0).max(100)
});

export const updateProfileSiswaSchema = profileSiswaSchema.partial();

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type ProfileSiswaDto = z.infer<typeof profileSiswaSchema>;
export type UpdateProfileSiswaDto = z.infer<typeof updateProfileSiswaSchema>;

