function ProductRegistrationForm () {
    return (
        <form className="productRegisterForm">
            <div className="rowForProduct">
                <div className="productInputCont">
                    <label htmlFor="order_id">Order Id: </label>
                    <input id="order_id" type="text"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="received">Received:</label>
                    <input id='received' type="checkbox"/>
                </div>
            </div>
            <div className="rowForProduct">
                <div className="productInputCont">
                    <label htmlFor="quality">Quality:</label>
                    <input id="quality" type="number"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="fragility">Fragility:</label>
                    <input id="fragility" type="number"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="extra_packaging">Extra packaging:</label>
                    <input id="extra_packaging" type="checkbox"/>
                </div>
            </div>
            <div className="rowForProduct">
                <div className="productInputCont">
                    <label htmlFor="received_state">Received state:</label>
                    <input id="received_state" type="text"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="observations">Observations:</label>
                    <input id='observations' type="text"/>
                </div>
            </div>
            <div className="rowForProduct">
                <div className="productInputContV">
                    <label htmlFor="brand">Brand:</label>
                    <input id='brand' type="text"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="manufacturer">Manufacturer:</label>
                    <input id="manufacturer" type="text"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="sold_by">Sold by:</label>
                    <input id="sold_by" type="text"/>
                </div>
            </div>

            <div className="rowForProduct">
                <div className="productInputCont">
                    <label htmlFor="name">Name:</label>
                    <input id="name" type="text"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="model">Model:</label>
                    <input id="model" type="text"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="color">Color:</label>
                    <input id="color" type="text"/>
                </div>
            </div>
            <div className="rowForProduct">
                <div className="productInputCont">
                    <label htmlFor="height">Height:</label>
                    <input id="height" type="number"/> 
                </div>
                <div className="productInputCont">
                    <label htmlFor="length">Length:</label>
                    <input id="length" type="number"/>
                </div>
                <div className="productInputCont">
                    <label className="width">Width:</label>
                    <input id="width" type="number"/>
                </div>
            </div>
            <div className="rowForProduct">
                <div className="productInputcCont">
                    <label htmlFor="description">Description:</label>
                    <input id="description" type="text"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="other_details">Other details:</label>
                    <input id="other_details"/>
                </div>
            </div>
        </form>
    )
}

export default ProductRegistrationForm