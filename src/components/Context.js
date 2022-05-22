import React, { Component } from 'react'

export const DataContext = React.createContext()

export class DataProvider extends Component {

    state = {
        products: [
            {
                "_id":"1",
                "title":"PS5 Controller",
                "src":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6430/6430163_sd.jpg;maxHeight=200;maxWidth=200",
                "description":"ps5 controller",
                "content":"a dualsense ps5 controller for a better gaming experience!",
                "price":290,
                "count":"1"
            },
            {
                "_id":"2",
                "title":"PS4 Controller Black",
                "src":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5580/5580915_sd.jpg;maxHeight=200;maxWidth=200",
                "description":"ps4 controller",
                "content":"a dualshock ps4 controller for a better gaming experience!",
                "price":220,
                "count":"1"   
            },
            {
                "_id":"3",
                "title":"PS4 Controller White",
                "src":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6356/6356223_sd.jpg;maxHeight=200;maxWidth=200",
                "description":"ps4 controller",
                "content":"a dualshock ps4 controller for a better gaming experience!",
                "price":230,
                "count":"1"  
            },
            {
                "_id":"4",
                "title":"PS4 Controller Camo",
                "src":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5709/5709485_sd.jpg;maxHeight=200;maxWidth=200",
                "description":"ps4 controller",
                "content":"a dualshock ps4 controller for a better gaming experience!",
                "price":260,
                "count":"1"  
            },
            {
                "_id":"5",
                "title":"PS4 Controller Red",
                "src":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5673/5673600_sd.jpg;maxHeight=200;maxWidth=200",
                "description":"ps4 controller",
                "content":"a dualshock ps4 controller for a better gaming experience!",
                "price":250,
                "count":"1"  
            },
            {
                "_id":"6",
                "title":"PS4 Controller Blue",
                "src":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6200/6200230_sd.jpg;maxHeight=200;maxWidth=200",
                "description":"ps4 controller",
                "content":"a dualshock ps4 controller for a better gaming experience!",
                "price":240,
                "count":"1" 
            }
        ],
        cart: [],
        total: 0
    }

    addCart = (id) =>{
        const {products,cart} = this.state
        const check = cart.every(item=>{
            return item._id !== id
        })
        if (check){
        const data = products.filter(product =>{
            return product._id === id
        })
        this.setState({cart: [...cart,...data]})
    } else{
        alert("The product has been added to cart.")
    }
    }

    reduction = id =>{
        const {cart} = this.state
        cart.forEach(item=>{
            if(item._id === id){
                item.count > 1 ? item.count -= 1 : item.count = 1
            }
        })
        this.setState({cart:cart})
        this.getTotal()
    }

    increase = id =>{
        const {cart} = this.state
        cart.forEach(item=>{
            if(item._id === id){
                item.count ++ 
            }
        })
        this.setState({cart:cart})
        this.getTotal()
    }

    removeProduct = id =>{
        if(window.confirm("Are you sure you want to remove this product from your cart? ")){
        const {cart} = this.state
        cart.forEach((item, index)=>{
            if(item._id === id){
                cart.splice(index, 1)
            }
        })
        this.setState({cart:cart})
        this.getTotal()}
    }

    getTotal = () =>{
        const {cart} = this.state
        const res = cart.reduce((prev, item) =>{
            return prev + (item.price * item.count)
        }, 0)
        this.setState({total: res})
        }

    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    }

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'))
        if(dataCart !== null){
            this.setState({cart: dataCart})
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'))
        if(dataTotal !== null){
            this.setState({total: dataTotal})
        }
    }

    render() {
        const {products, cart, total} = this.state
        const {addCart, reduction, increase, removeProduct, getTotal} = this
        return (
            <DataContext.Provider value={{products, addCart, cart, reduction, increase, removeProduct, total, getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}

