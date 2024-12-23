import ProductRegistrationForm from "../ProductRegistration/ProductRegistrationForm"
import AdminConsole from "./AdminConsole"

function ProductRegistration () {
    return (
        <div className="productRegisterCont">
            <AdminConsole />
            <ProductRegistrationForm />
        </div>
    )
}

export default ProductRegistration