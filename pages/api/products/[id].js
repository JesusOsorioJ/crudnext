import { pool } from '../../../config/db';

export default async function handler(req, res) {
    console.log("pse por aqui", req.method);
    switch (req.method) {
        case 'GET':
            return await getproducts(req, res);
        case 'POST':
            return await saveProduct(req, res);
        case 'DELETE':
            return await deleteProduct(req, res);
        case 'PUT':
            return await updateProduct(req, res);
    }
}

const getproducts = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM product')
    return res.status(200).json(result)
}

const saveProduct = async (req, res) => {
    const { name, description, price } = req.body;
    const [result] = await pool.query("INSERT INTO product SET ?", {
        name, description, price
    });
    return res.status(200).json({ name, price, description, id: result.insertId })
}

const deleteProduct = async (req, res) => {
    const { id } = req.query;
    const [result] = await pool.query("DELETE FROM product WHERE id = ?",
        [id]);
    return res.status(204).json()
}

const updateProduct = async (req, res) => {
    const { id } = req.query;
    console.log("dsdwdgggggggggggggr");
    const { name, description, price } = req.body
    try {
        const [result] = await pool.query("UPDATE product SET name = ?, description = ?, price = ? WHERE id = ?",
            [ name, description, price , id]);
        return res.status(204).json()
    } catch (error) {
        console.log(error.message)
    }
}