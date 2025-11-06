const fs = require('fs/promises');
const file = 'tasks.json';

// Membaca semua tugas
async function getTasks() {
  try {
    const data = await fs.readFile(file, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Gagal membaca file:', error.message);
    return []; 
  }
}

// Menyimpan tugas ke file
async function saveTasks(tasks) {
  try {
    await fs.writeFile(file, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error('Gagal menyimpan data:', error.message);
  }
}

// Menambah tugas baru
async function addTask(title) {
  try {
    const tasks = await getTasks();
    const newTask = { id: tasks.length + 1, title, done: false };
    tasks.push(newTask);
    await saveTasks(tasks);
    console.log(`Tugas ditambahkan: "${title}" (ID: ${newTask.id})`);
  } catch (error) {
    console.error('Gagal menambah tugas:', error.message);
  }
}

// Menampilkan daftar tugas
async function listTasks() {
  try {
    const tasks = await getTasks();
    console.log('\n--- DAFTAR TUGAS ---');
    if (tasks.length === 0) {
      console.log('Belum ada tugas tersimpan.');
      return;
    }
    tasks.forEach(t => {
      const status = t.done ? '(Selesai)' : '(Belum)';
      console.log(`[${t.id}] ${t.title} ${status}`);
    });
    console.log('-------------------------\n');
  } catch (error) {
    console.error('Gagal menampilkan tugas:', error.message);
  }
}

// Menandai tugas selesai
async function completeTask(id) {
  try {
    const tasks = await getTasks();
    const task = tasks.find(t => t.id === Number(id));
    if (!task) return console.log(`Tidak ditemukan tugas dengan ID ${id}.`);
    if (task.done) return console.log(`Tugas "${task.title}" sudah selesai.`);
    task.done = true;
    await saveTasks(tasks);
    console.log(`Tugas selesai: "${task.title}"`);
  } catch (error) {
    console.error('Gagal memperbarui tugas:', error.message);
  }
}

// Menghapus tugas
async function removeTask(id) {
  try {
    const tasks = await getTasks();
    const filtered = tasks.filter(t => t.id !== Number(id));
    if (filtered.length === tasks.length)
      return console.log(`Tidak ditemukan tugas dengan ID ${id}.`);
    await saveTasks(filtered);
    console.log(`Tugas dengan ID ${id} telah dihapus.`);
  } catch (error) {
    console.error('Gagal menghapus tugas:', error.message);
  }
}

module.exports = { addTask, listTasks, completeTask, removeTask };
