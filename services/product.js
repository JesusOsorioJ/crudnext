import axios from 'axios'

export async function getAllProduct(id){
    return (await axios.get('/api/products',product))
}
export async function updateOneProduct(id){
    const res = await axios.post('/api/products',product)
}
export async function deleteOneProduct(id){
    const res = await axios.post('/api/products',product)
}