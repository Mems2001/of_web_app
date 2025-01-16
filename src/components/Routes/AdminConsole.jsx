import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setLocation } from "../../store/slices/location.slice";

function AdminConsole () {
    
    const dispatch = useDispatch();
    dispatch(setLocation(window.location.href.split('#')[1]));
    const location = useSelector(state => state.locationSlice);

    return (
        <div role="tablist" className="flex tabs tabs-boxed justify-self-center">
            
                <NavLink role="tab" className={location?.includes('my_orders') ? 'tab bg-gray-300' : 'tab'} to={'/admin/my_orders'}>
                    Mis pedidos
                </NavLink>
                <NavLink role="tab" className={location?.includes('create_order') ? 'tab bg-gray-300' : 'tab'} to={'/admin/create_order'}>
                    Añadir Pedido
                </NavLink>
                <NavLink role="tab" className={location?.includes('product_registration') ? 'tab bg-gray-300' : 'tab'} to={'/admin/product_registration'}>
                    Registrar Producto
                </NavLink>
            
        </div>
    )
}

export default AdminConsole