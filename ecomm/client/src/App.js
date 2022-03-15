import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/main.scss"

import AddProduct from "./components/ProductComponents/AddProduct"
import EditProduct from "./components/ProductComponents/EditProduct"
import DeleteProduct from "./components/ProductComponents/DeleteProduct"
import DisplayAllProducts from "./components/ProductComponents/DisplayAllProducts"
import DisplayProductDetails from "./components/ProductComponents/DisplayProductDetails";
import BuyProduct from "./components/ProductComponents/BuyProduct"
import PayPalMessage from "./components/ProductComponents/PayPalMessage"
import Register from "./components/UserComponents/Register";
import ResetDatabase from "./components/ResetDatabase";

import HomePage from "./components/HomePage"
import Account from "./components/UserComponents/Account";
import Login from "./components/UserComponents/Login";
import Logout from "./components/UserComponents/Logout";
import Cart from "./components/Cart";
import {ACCESS_LEVEL_GUEST} from "./config/global_constants"
import LoggedInRoute from "./components/LoggedInRoute";
import SideBar from "./components/SideBar";
import DisplayAllUsers from "./components/UserComponents/DisplayAllUsers";
import DeleteUser from "./components/UserComponents/DeleteUser";
import PurchaseHistory from "./components/UserComponents/PurchaseHistory"

import Header from "./components/Header";

if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
    localStorage.profilePhoto = null
}



export default class App extends Component 
{
    render()
    {
        return (
            <BrowserRouter>
            <Header/>

                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/Account/:id" component={Account}/>
                    <LoggedInRoute exact path="/Logout" component={Logout}/>
                    <LoggedInRoute exact path="/DisplayAllUsers" component={DisplayAllUsers}/>
                    <LoggedInRoute exact path="/DeleteUser/:id" component={DeleteUser} />
                    <LoggedInRoute exact path="/AddProduct" component={AddProduct} />
                    <LoggedInRoute exact path="/EditProduct/:id" component={EditProduct} />
                    <LoggedInRoute exact path="/DeleteProduct/:id" component={DeleteProduct} />
                    <Route exact path="/BuyProduct/:id" component={BuyProduct} />
                    <Route exact path="/PayPalMessage/:messageType/:payPalPaymentID" component={PayPalMessage}/>

                    <Route exact path="/HomePage" component={HomePage}/>

                    <Route exact path="/DisplayAllProducts" component={DisplayAllProducts}/>
                    <Route exact path="/DisplayProductDetails/:id" component={DisplayProductDetails}/>
                    <Route exact path="/PurchaseHistory" component={PurchaseHistory}/>
                    <Route exact path="/DisplayAllProducts" component={SideBar}/>
                    <Route exact path="/Cart" component={Cart}/>
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/ResetDatabase" component={ResetDatabase}/>
                    <Route path="*" component={DisplayAllProducts}/>
                </Switch>

                <br/>
                <footer>©2022 Nathan Field </footer>
            </BrowserRouter>

        )
    }
}