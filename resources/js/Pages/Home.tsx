import ProductItem from '@/Components/App/ProductItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, PaginationProps, Product } from '@/types';
import { Head, Link } from '@inertiajs/react';
import hero from "../../../public/img/hero.png"

export default function Home({ products }: PageProps<{ products : PaginationProps<Product>}>) {
    return (
        <>
            <AuthenticatedLayout>
                <Head title="Welcome" />
                <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse gap-8">
                        <img
                            src={hero}
                            className="w-1/2 shadow-2xl rounded-lg object-cover transition-all duration-300 hover:shadow-lg"
                        />
                        <div>
                            <h1 className="text-5xl font-bold text-primary-focus">Welcome To Maa Ambey Stores!</h1>
                            <p className="py-6 text-base-content/80">
                            Discover a world of premium products curated just for you. 
                                Our store offers high-quality items at competitive prices with 
                                exceptional customer service.
                            </p>
                            <button className="btn btn-primary shadow-md hover:shadow-lg transition-all duration-300">Shop Now</button>
                        </div>
                    </div>
                </div>
                
                <div className="bg-base-100 py-8">
                    <div className="grid grid-cols-1 mx-6 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {products.data.map(product => (
                            <ProductItem product={product} key={product.id} />
                        ))}
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}