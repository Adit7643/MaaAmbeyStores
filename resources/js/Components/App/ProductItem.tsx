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
    const addToCart =  () => {
        form.post(route('cart.store', product.id),{
            preserveScroll: true,
            preserveState : true,
            onError:(err) =>{
                console.log(err)
            }
        })
    }
    return (
        <div className='card bg-base-100 shadow-xl'>
            <Link href={route('product.show', product.slug)}>
            <figure>
                <img
                src = {product.image}
                alt = {product.title}
                className='aspect-square object-cover' />
            </figure>
            </Link>
            <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p>
                   by <Link href='/' className='hover:underline'>{product.user.name}</Link>&nbsp;
                   in <Link href='/' className='hover:underline'>{product.department.name}</Link>
                </p>
                <div onClick={addToCart} className="card-actions item-center justify-between mt-3">
                    <button className="btn btn-primary"> Add to Cart</button>
                    <span className='text-2xl'>
                        <CurrencyFormatter amount={product.price} />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;