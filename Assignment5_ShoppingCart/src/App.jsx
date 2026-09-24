import {createContext,useContext,useReducer,useState} from "react";
import "./App.css";

const products=[{id:1,name:"Laptop",price:50000},{id:2,name:"Headphone",price:2000},{id:3,name:"Mouse",price:800}];
const CartContext=createContext();
function reducer(state,action){
 switch(action.type){
  case "add":{const old=state.find(x=>x.id===action.p.id);return old?state.map(x=>x.id===old.id?{...x,qty:x.qty+1}:x):[...state,{...action.p,qty:1}];}
  case "remove":return state.filter(x=>x.id!==action.id);
  case "qty":return state.map(x=>x.id===action.id?{...x,qty:Math.max(1,action.qty)}:x);
  default:return state;
 }
}
function App(){
 const [cart,dispatch]=useReducer(reducer,[]);
 const [coupon,setCoupon]=useState(""); const [discount,setDiscount]=useState(0);
 const subtotal=cart.reduce((s,x)=>s+x.price*x.qty,0);
 const afterDiscount=subtotal-(subtotal*discount/100);
 const gst=afterDiscount*0.18; const total=afterDiscount+gst;
 function apply(){if(coupon.toUpperCase()==="SAVE10")setDiscount(10);else setDiscount(0)}
 return <CartContext.Provider value={{cart,dispatch}}><div className="app"><h1>Online Shopping Cart</h1>
 <h2>Products</h2>{products.map(p=><div className="product" key={p.id}>{p.name} - ₹{p.price} <button onClick={()=>dispatch({type:"add",p})}>Add to Cart</button></div>)}
 <h2>Cart</h2>{cart.length===0?<p>Cart is empty</p>:cart.map(x=><div className="product" key={x.id}>{x.name} - ₹{x.price} × <input type="number" min="1" value={x.qty} onChange={e=>dispatch({type:"qty",id:x.id,qty:+e.target.value})}/><button onClick={()=>dispatch({type:"remove",id:x.id})}>Remove</button></div>)}
 <input placeholder="Coupon: SAVE10" value={coupon} onChange={e=>setCoupon(e.target.value)}/><button onClick={apply}>Apply Coupon</button>
 <p>Subtotal: ₹{subtotal.toFixed(2)}</p><p>Discount: {discount}%</p><p>GST (18%): ₹{gst.toFixed(2)}</p><h2>Grand Total: ₹{total.toFixed(2)}</h2>
 </div></CartContext.Provider>
}
export default App;