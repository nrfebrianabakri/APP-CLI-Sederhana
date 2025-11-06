const { addTask, listTasks, completeTask, removeTask } = require('./taskManager');

const command = process.argv[2];
const argument = process.argv[3];

async function main() {
  try {
    switch (command) {
      case 'add':
        if (!argument) return console.log('Masukkan nama tugas!');
        await addTask(argument);
        break;

      case 'list':
        await listTasks();
        break;

      case 'done':
        if (!argument) return console.log('Masukkan ID tugas!');
        await completeTask(argument);
        break;

      case 'remove':
        if (!argument) return console.log('Masukkan ID tugas!');
        await removeTask(argument);
        break;

      default:
        console.log(`
  Perintah yang tersedia:
  node index.js add "Nama Tugas"  -> Tambah tugas baru
  node index.js list              -> Lihat daftar tugas
  node index.js done <id>         -> Tandai tugas selesai
  node index.js remove <id>       -> Hapus tugas
`);
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message);
  }
}

main();
