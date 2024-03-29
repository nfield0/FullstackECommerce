import React, {Component} from "react"
import {Link, Redirect} from "react-router-dom"

import axios from "axios"

import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../../config/global_constants"
import {CloseButton} from "react-bootstrap";


export default class DisplayProductDetails extends Component {
    constructor(props) {
        super(props)


        this.state = {
            email: "",
                productName: "",
                size: "",
                color: "",
                stockLevel: "",
                price: "",
                sold: false,
                selectedFiles: null,
                redirectToDisplayAllProducts:false
        }
    }


    componentDidMount() {
        axios.get(`${SERVER_HOST}/products/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {

                        this.setState({
                            productName: res.data.productName,
                            size: res.data.size,
                            color: res.data.color,
                            stockLevel: res.data.stockLevel,
                            price: res.data.price,
                            productImages: res.data.productImages,
                            sold: res.data.sold

                        })
                        this.state.productImages.map(photo =>
                        {
                            return axios.get(`${SERVER_HOST}/product/photo/${photo.filename}`)
                                .then(res =>
                                {
                                    if(res.data)
                                    {
                                        if (res.data.errorMessage)
                                        {
                                            console.log(res.data.errorMessage)
                                        }
                                        else
                                        {
                                            document.getElementById(photo._id).src = `data:;base64,${res.data.image}`
                                        }
                                    }
                                    else
                                    {
                                        console.log("Record not found")
                                    }
                                })
                                .catch(error => {

                                        console.log(error)
                                    }
                                )
                        })                    }
                } else {
                    console.log(`Record not found`)
                }
            })


    }
    handleSubmit = (e) => {


        localStorage.cart = []
        let products = []
        products.push(this.props.match.params.id)
        localStorage.cart += products

        axios.get(`${SERVER_HOST}/products/${this.props.match.params.id}`, {headers: {"authorization": localStorage.token}})
            .then(res => {
                // console.log(res.data)
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {

                                    }


                }
            })

    }


    render() {
        let soldOrForSale = null
        if(localStorage.accessLevel >= ACCESS_LEVEL_GUEST)
        {
            if(this.state.sold !== true)
            {
                if(localStorage.accessLevel > ACCESS_LEVEL_GUEST) {
                    soldOrForSale = <Link className="add-button" to={"/AddToCart/" + this.props.match.params.id}
                                         >Add to Cart</Link>
                }
                else
                {
                    // soldOrForSale = <Link className="add-button" to={"/Cart"}
                    //                       onClick={this.handleSubmit}>Add to Cart</Link>
                }
            }
            else
            {
                soldOrForSale = "SOLD"
            }
        }
        return (
            <div className="form-container">
                {this.state.redirectToDisplayAllProducts ? <Redirect to="/DisplayAllProducts"/> : null}
                <div id="modal">
                    <div id="modalContent">
                        <div id="exitButton" onClick={() => this.setState({redirectToDisplayAllProducts: true})}>

                            <CloseButton/>

                        </div>
                        <h1>{this.state.title}</h1>
                        <div className="modalImages">
                        {this.state.productImages ? this.state.productImages.map(photo => <img key={photo._id} id={photo._id} className= "modalImage" alt=""/> ): null}
                        </div>
                        <h2>Product Name</h2>
                        <p>{this.state.productName}</p>
                        <h2>Size</h2>
                        <p>{this.state.size}</p>
                        <h2>Color</h2>
                        {this.state.color}
                        <h2>Stock</h2>
                        <p>{this.state.stockLevel}</p>
                        <h2>Price</h2>
                        <p>€{this.state.price}</p>

                        {soldOrForSale}

                    </div>


                </div>


            </div>
        )
    }
}