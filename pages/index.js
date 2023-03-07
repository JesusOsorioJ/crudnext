import { ProductForm } from '../components/productForm';
import axios from 'axios';
import { useState } from 'react'

function HomePage({ products }) {
    const [ details, setDetails] = useState({name:null,description:"",price:""})

    const handlerOnClick = (id)=>{
        setDetails(products.filter(product=>product.id==id)[0])
    }
    return (
        <div>
            {details.name!=null?<ProductForm data={details} setDetails={setDetails}/>:<></>}
            <div className="grid bg-blue-400 text-white
            font-bold grid-cols-9 w-full py-4 gap-4">
                <p className='col-span-2 pl-6'>PRODUCT</p>
                <p className='col-span-2 pl-6'>DESCRIPTION</p>
                <p className='col-span-1 pl-6'>PRICE</p>
                <p className='col-span-2 pl-6'>DATE</p>
                <button className="bg-green-400 py-1 border hover:bg-green-600" onClick={()=>{setDetails({...details, name:""})}} >ADD NEW</button>
            </div>
            {products.map((product) => (
                <button className="group hover:border text-gray-600 grid grid-cols-9 w-full justify-items-start py-4" onClick={()=>handlerOnClick(product.id)} key={product.id}>                
                        <h1 className='col-span-2 pl-6'>{product.name}</h1>
                        <p className='col-span-2 pl-6'>{product.description}</p>
                        <p className='col-span-1 pl-6'>{product.price}</p>
                        <p className='col-span-2 pl-6'>{product.createAt}</p>
                        <p className='opacity-0 group-hover:opacity-100 font-bold
                        text-blue-500  '>Edit</p>
                </button>
            ))}
            
        </div>

    )
}

export const getServerSideProps = async (context) => {
    const { data: products } = await axios.get("/api/products/1")
    return {
        props: {
            products,
        }
    }
}
export default HomePage
