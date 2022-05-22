import React from 'react'
import Products from "./section/Products"
import Details from "./section/Details"
import {Route} from 'react-router-dom'
import Cart from './section/Cart'
import Payment from './section/Payment'

const Section = () => {
    return (
        <section>
            <Route path="/product" component={Products} exact/>
            <Route path="/product/:id" component={Details}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/payment" component={Payment}/>
        </section>
    )
}

export default Section
