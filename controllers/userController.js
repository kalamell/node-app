const pool = require('../utils/db');

exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const [result] = await pool.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const [users] = await pool.execute('SELECT * FROM users');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [users] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(users[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const [result] = await pool.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ id, name, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
