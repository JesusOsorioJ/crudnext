import axios from 'axios'
import { useState } from 'react'
export function ProductForm(){

    const [product, setProduct]= useState({})
    
    const handlerOnChange = (e) =>{
        const {value, name} = e.target
        setProduct({...setProduct, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/products',
        {name:'product 1', description: 'some product',
    price: 10000 })
    }

    
    return(
     <div  className="bg-gray-300">
        <form onSubmit={handleSubmit}>
            <label htmlFor='name' >Name</label>
            <input type='text' name='name' onChange={handlerOnChange}/>
            
            <label htmlFor='price' >Price</label>
            <input type='text' name='price' onChange={handlerOnChange}/>
            
            <label htmlFor='description' >Description</label>
            <input 
            onChange={handlerOnChange}
            type='text' name='description'
            rows="2"/>
            <button>Save products</button>
        </form>
     </div>   
    )
}