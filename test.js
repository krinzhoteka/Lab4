// test.js
const Database = require('./database');

// Подключение к базе данных
const db = new Database('./mydatabase.db');

// Тест 1: Добавление записи и получение по ID
db.Add({ ID: 1, name: 'John', message: 'Hello, World!' }, () => {
    db.GetByID(1, (err, row) => {
        console.log('Тест 1 (GetByID):', row);
        // Проверка, что запись с ID 1 существует и имеет правильное имя
        if (row && row.name === 'John') {
            console.log('Тест 1 прошел успешно.');
        } else {
            console.error('Тест 1 не удался.');
        }

        // Тест 2: Изменение записи и получение по имени
        db.Update(1, 'New message', () => {
            db.GetByName('John', (err, rows) => {
                console.log('Тест 2 (GetByName):', rows);
                // Проверка, что обновленное сообщение существует для имени 'John'
                if (rows && rows.length > 0 && rows[0].message === 'New message') {
                    console.log('Тест 2 прошел успешно.');
                } else {
                    console.error('Тест 2 не удался.');
                }

                // Тест 3: Добавление второй записи
                db.Add({ ID: 2, name: 'Alice', message: 'Testing, testing!' }, () => {
                    // Получение всех записей и проверка, что их две
                    db.db.all('SELECT * FROM Records', [], (err, allRows) => {
                        console.log('Тест 3 (Add):', allRows);
                        if (allRows && allRows.length === 2) {
                            console.log('Тест 3 прошел успешно.');
                        } else {
                            console.error('Тест 3 не удался.');
                        }

                        // Тест 4: Удаление записи и проверка отсутствия по ID
                        db.Delete(1, () => {
                            db.GetByID(1, (err, deletedRow) => {
                                console.log('Тест 4 (Delete):', deletedRow);
                                if (!deletedRow) {
                                    console.log('Тест 4 прошел успешно.');
                                } else {
                                    console.error('Тест 4 не удался.');
                                }
                            });
                        });
                    });
                });
            });
        });
    });
});