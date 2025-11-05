const fs = require('fs/promises');

// Membaca daftar tugas dari file tasks.json
async function getTasks() {
  try {
    const data = await fs.readFile('tasks.json', 'utf8');
    const tasks = JSON.parse(data);
    return tasks;
  } catch (err) {
    console.error('Gagal membaca file tasks.json:', err);
    return []; 
  }
}

// Menambah tugas baru
async function addTask(title) {
  try {
   
    const tasks = await getTasks();

    const newTask = {
      id: tasks.length + 1,
      title: title,
      done: false
    };

    tasks.push(newTask);

    await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2));

    console.log(`Tugas "${title}" berhasil ditambahkan!`);
  } catch (err) {
    console.error('Gagal menulis ke file tasks.json:', err);
  }
}

async function main() {
  await addTask('Belajar Node.js');
  const allTasks = await getTasks();
  
  console.log('Daftar Tugas:');
  allTasks.forEach(task => {
    console.log(`${task.id}. ${task.title} - ${task.done ? 'Selesai' : 'Belum'}`);
  });
}

main();
