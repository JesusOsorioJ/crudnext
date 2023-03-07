import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export function ProductForm({ data,setDetails }) {

    const [product, setProduct] = useState({ ...data })
    const [error, setError] = useState()


    const handlerOnChange = (e) => {
        const { value, name } = e.target
        setError()
        setProduct({ ...product, [name]: value })
    }

    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if( product.name == "" || product.price == "" || product.description == "" ){
            setError(["Please enter all input","Fill each input"]) 
        }else{
            if (data?.name) {
                const res = await axios.put('/api/products/' + data.id, product)
            } else {
                const res = await axios.post('/api/products/0', product)
            }
            setDetails({})
            router.push('/')
        }
        
       
    }

    const handlerOnDelete = async () => {
        await axios.delete('/api/products/' + data.id)
        setDetails({})
        router.push('/')
    }




    return (
        <div>
            <div className="absolute grid items-center
                justify-center z-10 w-full h-full bg-gray-500 opacity-80">
            </div>
            <div className="absolute grid items-center
                justify-center z-20 w-full h-full">
            <form className="flex flex-col bg-white p-6 w-[500px] opacity-100" onSubmit={handleSubmit}>
                <p className='text-[2rem]'>
                {data?.name? `Product id ${data?.id}` : "Add new"}</p>
                <p className='text-[1rem] text-red-400'>{error? error[0] : ""}</p>
                <div className='flex flex-col my-4'>
                    <label htmlFor='name' >Name</label>
                    <input className='border border-2' type='text' name='name' onChange={handlerOnChange} value={product.name} />
                    <p className='text-[1rem] text-red-400'>{error? error[1] : ""}</p>
                </div>
                <div className='flex flex-col my-4'>
                    <label htmlFor='price' >Price</label>
                    <input className='border border-2' name='price' type='number' onChange={handlerOnChange} value={product.price} />
                    <p className='text-[1rem] text-red-400'>{error? error[1] : ""}</p>
                </div>
                <div className='flex flex-col my-4 mb-6'>
                    <label htmlFor='description'>Description</label>
                    <input
                        onChange={handlerOnChange}
                        type='text' name='description'
                        rows="4" value={product.description}
                        className='border border-2' />
                    <p className='text-[1rem] text-red-400'>{error? error[1] : ""}</p>
                </div>
                

                <div className='flex justify-around'>
                {data?.name?
                    <button className="bg-red-400 hover:bg-red-600 text-gray-100 py-2 px-3 max-w-[10rem]" 
                    onClick={handlerOnDelete}>Eliminate</button>:
                    <button className="bg-red-400 hover:bg-red-600 text-gray-100 py-2 px-3 max-w-[10rem]"
                    onClick={()=>(setProduct({}))}>Cancelar</button>}
                <button className="bg-green-400 hover:bg-green-600 text-gray-100 py-2 px-3 max-w-[10rem]">
                    {data?.name? "update products" : "Save products"}
                </button>
                </div>
            </form>

            

            </div>

        </div>

    )
}