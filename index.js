const fs = require('fs/promises');

async function main() {
  const data = await fs.readFile('tasks.json', 'utf8');
  console.log('Isi file:', data);
}

main();