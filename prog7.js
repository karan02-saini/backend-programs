const mysql = require('mysql2');
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',   // your MySQL password here
  database: 'testdb'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.log('Database connection failed:', err.message);
  } else {
    console.log('Connected to MySQL database.');
    menu();
  }
});

// Menu
function menu() {
  console.log(`
Choose an operation:
1. Create (Insert)
2. Read (Select)
3. Update
4. Delete
5. Exit
  `);

  rl.question('Enter your choice: ', choice => {
    switch (parseInt(choice)) {
      case 1:
        createRecord();
        break;
      case 2:
        readRecords();
        break;
      case 3:
        updateRecord();
        break;
      case 4:
        deleteRecord();
        break;
      case 5:
        console.log('Goodbye!');
        rl.close();
        db.end();
        break;
      default:
        console.log('Invalid choice.');
        menu();
    }
  });
}


function createRecord() {
  rl.question('Enter name: ', name => {
    rl.question('Enter age: ', age => {
      const sql = 'INSERT INTO students (name, age) VALUES (?, ?)';
      db.query(sql, [name, age], err => {
        if (err) {
          console.log('Error inserting record:', err.message);
        } else {
          console.log('Record inserted successfully.');
        }
        menu();
      });
    });
  });
}

function readRecords() {
  const sql = 'SELECT * FROM students';
  db.query(sql, (err, results) => {
    if (err) {
      console.log('Error fetching records:', err.message);
    } else {
      console.table(results);
    }
    menu();
  });
}

function updateRecord() {
  rl.question('Enter ID to update: ', id => {
    rl.question('Enter new name: ', name => {
      rl.question('Enter new age: ', age => {
        const sql = 'UPDATE students SET name = ?, age = ? WHERE id = ?';
        db.query(sql, [name, age, id], err => {
          if (err) {
            console.log('Error updating record:', err.message);
          } else {
            console.log('Record updated successfully.');
          }
          menu();
        });
      });
    });
  });
}

function deleteRecord() {
  rl.question('Enter ID to delete: ', id => {
    const sql = 'DELETE FROM students WHERE id = ?';
    db.query(sql, [id], err => {
      if (err) {
        console.log('Error deleting record:', err.message);
      } else {
        console.log('Record deleted successfully.');
      }
      menu();
    });
  });
}
