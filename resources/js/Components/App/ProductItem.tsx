import React from 'react';
import { Product } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import CurrencyFormatter from '../Core/CurrencyFormatter';

function ProductItem({product}:{product : Product}) {
    const form = useForm<{
        option_ids: Record<string, number>;
        quantity : number,
        price:number | null;
    }>({
        option_ids: {},
        quantity: 1,
        price: product.price 
    })
    
    const addToCart = () => {
        form.post(route('cart.store', product.id),{
            preserveScroll: true,
            preserveState : true,
            onError:(err) =>{
                console.log(err)
            }
        })
    }
    
    return (
        <div className='card bg-base-100 shadow-lg w-[260px] hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden group h-96 flex flex-col border border-base-200'>
    <Link href={route('product.show', product.slug)} className="h-56 overflow-hidden">
        <figure className="relative h-full overflow-hidden">
            <img
                src={product.image}
                alt={product.title}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-xl' />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </figure>
    </Link>
    <div className="card-body p-4 flex flex-col flex-1">
        <Link href={route('product.show', product.slug)} className="mb-1">
            <h2 className="card-title text-lg font-bold hover:text-primary transition-colors line-clamp-1">{product.title}</h2>
        </Link>
        <p className="text-xs text-base-content/70 mb-1">
            by <Link href='/' className='text-secondary hover:underline font-medium'>{product.user.name}</Link>&nbsp;
            in <Link href='/' className='text-secondary hover:underline font-medium'>{product.department.name}</Link>
        </p>
        
        <div className="border-t border-base-200 my-2 mt-auto"></div>
        
        <div className="card-actions flex items-center justify-between">
            <span className='font-bold text-lg text-primary'>
                <CurrencyFormatter amount={product.price} />
            </span>
            <button 
                onClick={addToCart} 
                className="btn btn-primary btn-sm hover:scale-110 active:scale-100 transition-transform shadow-md rounded-full px-4 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
            </button>
        </div>
    </div>
</div>

    );
}

export default ProductItem;