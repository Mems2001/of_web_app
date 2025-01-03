function ProductPage () {
    return (
        <div className="productPageCont bg-white overscroll-auto overflow-auto">
            <section className="productHero1 w-full">
                <img src="https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg" className="w-full h-3/4 object-contain"/>
                
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Name</h1>
                    <p className="text-3xl tracking-tight text-gray-900">$ 99.99</p>
                    
                </div> 
            </section>
        </div>
    )
}

export default ProductPage