const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

async function test() {
  console.log('Starting test...');
  try {
    const db = await open({
      filename: path.join(__dirname, 'test.db'),
      driver: sqlite3.Database
    });
    console.log('DB opened');
    await db.exec('CREATE TABLE IF NOT EXISTS test (id INTEGER)');
    console.log('Table created');
    await db.run('INSERT INTO test (id) VALUES (1)');
    console.log('Inserted');
    const row = await db.get('SELECT * FROM test');
    console.log('Result:', row);
    await db.close();
    console.log('DB closed');
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
