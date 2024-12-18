import axios from "axios";
import { useForm } from "react-hook-form"

function PedidoForm () {
    const {register , handleSubmit , reset} = useForm();

    const submit = data => {
        const URL = 'http://localhost:8000/api/v1/orders'

        axios.post(URL , data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <form className="pedidoFormCont" onSubmit={handleSubmit(submit)}>
            <h2>Crear pedido</h2>
            <div className="pedidoFormCont2">
                <div className="pedidoInputCont">
                    <label htmlFor="temu_id">Temu Id:</label>
                    <input {...register('temu_id')} id="temu_id" type="text"/>
                </div>
                <div className="pedidoInputCont">
                    <label htmlFor="delivery_company">Delivery Company:</label>
                    <input {...register('delivery_company')} id="delivery_company" type="text"/>
                </div>
                <div className="pedidoInputCont">
                    <label htmlFor="dlivey_id">Delivery Id:</label>
                    <input {...register('delivery_id')} id="delivery_id" type="text"/>
                </div>
                <div className="pedidoInputCont">
                    <label htmlFor="order_date">Order Date:</label>
                    <input {...register('order_date')} id="order_date" type="date"/>
                </div>
                <div className="pedidoInputCont">
                    <label htmlFor="products_count">Products count:</label>
                    <input {...register('products_count')} id="products_count" type="number"/>
                </div>
                <div className="pedidoInputCont">
                    <label htmlFor="price">Price:</label>
                    <input {...register('price')} id="price" type="text"/>
                </div>
            </div>
            <button>
                Crear
            </button>
        </form>
    )
}

export default PedidoForm