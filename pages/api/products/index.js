import {pool} from '../../../config/db';

export default async function handler (req,res){
    switch( req.method){
        case 'GET':
        return await getproducts(req,res);     
        case 'POST':
        return await saveproduct(req,res);    
    }
}

const getproducts = async (req, res)=>{
    const [result] = await pool.query('SELECT * FROM product')
    console.log()
    return res.status(200).json(result)
} 

const saveproduct = async (req, res)=>{
    const {name, description, price}= req.body;
        const [result] = await pool.query("INSERT INTO product SET ?", {
            name, description, price
        });

    return res.status(200).json({name, price, description,
    id: result.insertId})
}