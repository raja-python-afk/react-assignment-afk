import {useState} from "react";
import "./App.css";

const initial=[
{id:1,name:"Rahul",empId:"E101",dept:"HR",gender:"Male",phone:"9876543210",local:"Kolkata",permanent:"Kolkata"},
{id:2,name:"Riya",empId:"E102",dept:"IT",gender:"Female",phone:"9876543211",local:"Howrah",permanent:"Howrah"}
];

export default function App(){
 const [employees,setEmployees]=useState(initial);
 const [form,setForm]=useState({name:"",empId:"",dept:"",gender:"",phone:"",local:"",permanent:""});
 const [editId,setEditId]=useState(null);
 const [search,setSearch]=useState("");
 const [filter,setFilter]=useState("All");

 function change(e){setForm({...form,[e.target.name]:e.target.value})}
 function save(e){
   e.preventDefault();
   if(editId){setEmployees(employees.map(x=>x.id===editId?{...form,id:editId}:x));setEditId(null)}
   else setEmployees([...employees,{...form,id:Date.now()}]);
   setForm({name:"",empId:"",dept:"",gender:"",phone:"",local:"",permanent:""});
 }
 function edit(x){setEditId(x.id);setForm(x)}
 function remove(id){setEmployees(employees.filter(x=>x.id!==id))}
 const shown=employees.filter(x=>
   (filter==="All"||x.dept===filter) &&
   (x.name.toLowerCase().includes(search.toLowerCase())||x.empId.toLowerCase().includes(search.toLowerCase()))
 );
 return <div className="app"><h1>Employee Directory</h1>
 <form onSubmit={save}>{["name","empId","dept","gender","phone","local","permanent"].map(k=><input key={k} name={k} placeholder={k} value={form[k]} onChange={change} required/>)}<button>{editId?"Update":"Add Employee"}</button></form>
 <input placeholder="Search employee" value={search} onChange={e=>setSearch(e.target.value)}/>
 <select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>HR</option><option>IT</option><option>Sales</option></select>
 <h3>Employee Count: {employees.length}</h3>
 {shown.map(x=><div className="card" key={x.id}><b>{x.name}</b> ({x.empId})<p>{x.dept} | {x.gender} | {x.phone}</p><p>Local: {x.local} | Permanent: {x.permanent}</p><button onClick={()=>edit(x)}>Edit</button> <button onClick={()=>remove(x.id)}>Delete</button></div>)}
 </div>
}