import "./App.css";

function Header(){return <header><h1>My Portfolio</h1><nav><a href="#about">About</a> <a href="#education">Education</a> <a href="#skills">Skills</a> <a href="#contact">Contact</a></nav></header>}
function About(){return <section id="about"><h2>About Me</h2><p>Hello! I am a React student learning web development.</p></section>}
function Education(){return <section id="education"><h2>Education</h2><p>BCA / Computer Science Student</p></section>}
function Skills(){return <section id="skills"><h2>Skills</h2><ul><li>HTML</li><li>CSS</li><li>JavaScript</li><li>React</li></ul></section>}
function Contact(){return <section id="contact"><h2>Contact</h2><p>Email: student@example.com</p><p>Phone: 9876543210</p></section>}
function Footer(){return <footer>© 2026 My Portfolio</footer>}
export default function App(){return <><Header/><main><About/><Education/><Skills/><Contact/></main><Footer/></>}