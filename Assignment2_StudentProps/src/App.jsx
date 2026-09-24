import {useState} from "react";
import "./App.css";

const students=[
{name:"Rahul",roll:101,department:"CSE",semester:4,cgpa:8.5,photo:"https://via.placeholder.com/100"},
{name:"Riya",roll:102,department:"IT",semester:4,cgpa:9.2,photo:"https://via.placeholder.com/100"},
{name:"Amit",roll:103,department:"CSE",semester:4,cgpa:7.8,photo:"https://via.placeholder.com/100"}
];

function Header(){return <header><h1>Student Information Portal</h1></header>}
function StudentCard({student}){return <div className="card"><img src={student.photo}/><h2>{student.name}</h2><p>Roll: {student.roll}</p><p>Department: {student.department}</p><p>Semester: {student.semester}</p><p>CGPA: {student.cgpa}</p></div>}
function StudentList({students}){return <div className="grid">{students.map(s=><StudentCard key={s.roll} student={s}/>)}</div>}
function Footer(){return <footer>Student Portal</footer>}
export default function App(){
 const [list,setList]=useState(students);
 function sortByCGPA(){setList([...list].sort((a,b)=>b.cgpa-a.cgpa))}
 return <><Header/><button onClick={sortByCGPA}>Sort by CGPA</button><StudentList students={list}/><Footer/></>
}