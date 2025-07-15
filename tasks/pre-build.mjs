import { promises as fs } from 'fs';
import path from 'path';

const rootDir = path.resolve(process.cwd(), '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

// 1. Buat folder dist jika belum ada
async function ensureDist() {
  try {
    await fs.mkdir(distDir, { recursive: true });
    console.log('Folder dist siap.');
  } catch (err) {
    console.error('Gagal membuat folder dist:', err);
    process.exit(1);
  }
}

// 2. Salin file dari public ke dist (jika ada)
async function copyPublic() {
  try {
    await fs.access(publicDir);
    const files = await fs.readdir(publicDir);
    for (const file of files) {
      await fs.copyFile(
        path.join(publicDir, file),
        path.join(distDir, file)
      );
    }
    console.log('File public disalin ke dist.');
  } catch {
    // Folder public tidak ada, tidak masalah
  }
}

// 3. Jalankan pre-build
async function preBuild() {
  await ensureDist();
  await copyPublic();
  console.log('Pre-build selesai. Anda bisa menjalankan MFE secara independen.');
}

preBuild();