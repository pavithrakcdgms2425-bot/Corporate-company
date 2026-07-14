import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "./axios";


// Stagger container
const statsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};


const statItem = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};



function Dashboard() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );


  const userName =
    user?.name || "Employee";


  const navigate = useNavigate();


  const [tasks, setTasks] =
    useState([]);


  const [meetings, setMeetings] =
    useState([]);



  useEffect(() => {

    const fetchData = async () => {

      try {

        const taskResponse =
          await API.get("/tasks");


        setTasks(taskResponse.data);



        const meetingResponse =
          await API.get("/meetings");


        setMeetings(meetingResponse.data);


      } catch(error) {

        console.log(
          "Dashboard Error:",
          error
        );

      }

    };


    fetchData();

  }, []);



  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

  };



  const hour =
    new Date().getHours();


  let greeting =
    "Good Morning";


  if(hour >= 12 && hour < 18){

    greeting =
      "Good Afternoon";

  }
  else if(hour >= 18){

    greeting =
      "Good Evening";

  }




  const allMeetings =
    meetings;



  const upcomingMeetings =
    [...allMeetings]
    .sort(
      (a,b)=>
      new Date(
        `${a.date}T${a.time}`
      )
      -
      new Date(
        `${b.date}T${b.time}`
      )
    )
    .slice(0,5);




  const completedTasks =
    tasks.filter(
      task=>task.completed
    ).length;



  const pendingTasks =
    tasks.filter(
      task=>!task.completed
    ).length;




  const productivity =
    tasks.length === 0
    ? 0
    :
    Math.round(
      (completedTasks /
      tasks.length)
      *
      100
    );




return (

<>

<motion.div
className="top-bar"
initial={{
opacity:0,
y:-15
}}
animate={{
opacity:1,
y:0
}}
transition={{
duration:0.4
}}
>


<input
type="text"
placeholder="🔍 Search..."
className="search-bar"
/>



<motion.button
className="logout-btn"
onClick={handleLogout}
whileHover={{
scale:1.05
}}
whileTap={{
scale:0.95
}}
>
Logout
</motion.button>



<div className="top-icons">

<motion.span
whileHover={{
rotate:15,
scale:1.2
}}
style={{
display:"inline-block"
}}
>
🔔
</motion.span>


<span className="profile">
👤 {userName}
</span>


</div>


</motion.div>





<motion.h1
initial={{
opacity:0,
y:15
}}
animate={{
opacity:1,
y:0
}}
>
{greeting}, {userName} 👋
</motion.h1>



<motion.p
initial={{
opacity:0
}}
animate={{
opacity:1
}}
>

{new Date().toLocaleDateString(
"en-US",
{
weekday:"long",
day:"numeric",
month:"long",
year:"numeric"
}
)}

</motion.p>





<motion.div
className="stats-container"
variants={statsContainer}
initial="hidden"
animate="visible"
>



<motion.div
className="stat-card"
variants={statItem}
whileHover={{
y:-6,
scale:1.03
}}
>
<h3>
📅 Total Meetings
</h3>

<p>
{allMeetings.length}
</p>

</motion.div>




<motion.div
className="stat-card"
variants={statItem}
whileHover={{
y:-6,
scale:1.03
}}
>

<h3>
⏳ Pending Tasks
</h3>

<p>
{pendingTasks}
</p>

</motion.div>





<motion.div
className="stat-card"
variants={statItem}
whileHover={{
y:-6,
scale:1.03
}}
>

<h3>
✔ Completed Tasks
</h3>

<p>
{completedTasks}
</p>

</motion.div>




<motion.div
className="stat-card"
variants={statItem}
whileHover={{
y:-6,
scale:1.03
}}
>

<h3>
📊 Productivity
</h3>

<p>
{productivity}%
</p>

</motion.div>



</motion.div>






<div className="bottom-section">


<motion.div
className="meeting-card"
initial={{
opacity:0,
y:30
}}
animate={{
opacity:1,
y:0
}}
>


<h2>
📅 Upcoming Meetings
</h2>



{
upcomingMeetings.length>0
?

upcomingMeetings.map(
(meeting,index)=>(


<motion.div
key={meeting._id || index}
className="meeting-item"
whileHover={{
x:4
}}
>


<p>
📌 {meeting.title}
</p>


<small>
📅 {meeting.date}
{" | "}
🕒 {meeting.time}
</small>


</motion.div>


)

)

:

<p>
No meetings scheduled.
</p>

}



</motion.div>


</div>


</>

);

}


export default Dashboard;