const fs = require('fs/promises');
const file = 'tasks.json';

// Membaca semua tugas
async function getTasks() {
  try {
    const data = await fs.readFile(file, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Menyimpan tugas ke file
async function saveTasks(tasks) {
  await fs.writeFile(file, JSON.stringify(tasks, null, 2));
}

// Menambah tugas baru
async function addTask(title) {
  const tasks = await getTasks();
  const newTask = { id: tasks.length + 1, title, done: false };
  tasks.push(newTask);
  await saveTasks(tasks);
  console.log(`Tugas ditambahkan: "${title}" (ID: ${newTask.id})`);
}

// Menampilkan daftar tugas
async function listTasks() {
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
}

// Menandai tugas selesai
async function completeTask(id) {
  const tasks = await getTasks();
  const task = tasks.find(t => t.id === Number(id));
  if (!task) return console.log(`Tidak ditemukan tugas dengan ID ${id}.`);
  if (task.done) return console.log(`Tugas "${task.title}" sudah selesai.`);
  task.done = true;
  await saveTasks(tasks);
  console.log(`Tugas selesai: "${task.title}"`);
}

// Menghapus tugas
async function removeTask(id) {
  const tasks = await getTasks();
  const filtered = tasks.filter(t => t.id !== Number(id));
  if (filtered.length === tasks.length)
    return console.log(`Tidak ditemukan tugas dengan ID ${id}.`);
  await saveTasks(filtered);
  console.log(`Tugas dengan ID ${id} telah dihapus.`);
}

module.exports = { addTask, listTasks, completeTask, removeTask };
