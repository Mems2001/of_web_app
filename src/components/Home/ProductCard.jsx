import axios from "axios";
import { useEffect, useState } from "react"

function ProductCard ({product}) {
    return (
        <article className="productArticle">
            {product?.name}
            {product?.price}
        </article>
    )
}

export default ProductCard