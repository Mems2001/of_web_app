import axios from "axios";
import { useEffect, useState } from "react"

function ProductCard ({product}) {
    return (
        <article className="productArticle">
            {product?.name}
        </article>
    )
}

export default ProductCard