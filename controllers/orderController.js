const pool = require('../utils/db');

exports.createOrder = async (req, res) => {
    const { user_id, product_name, quantity } = req.body;
    try {
        const [result] = await pool.execute('INSERT INTO orders (user_id, product_name, quantity) VALUES (?, ?, ?)', [user_id, product_name, quantity]);
        res.status(201).json({ id: result.insertId, user_id, product_name, quantity });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const [orders] = await pool.execute('SELECT * FROM orders');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const [orders] = await pool.execute('SELECT * FROM orders WHERE id = ?', [id]);
        if (orders.length === 0) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(orders[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    const { user_id, product_name, quantity } = req.body;
    try {
        const [result] = await pool.execute('UPDATE orders SET user_id = ?, product_name = ?, quantity = ? WHERE id = ?', [user_id, product_name, quantity, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ id, user_id, product_name, quantity });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute('DELETE FROM orders WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Order not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
