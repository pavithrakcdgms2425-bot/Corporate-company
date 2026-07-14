import "./Analytics.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import API from "./axios";


function Analytics() {


  const [tasks, setTasks] =
    useState([]);


  const [meetings, setMeetings] =
    useState([]);



  useEffect(() => {

    const fetchAnalyticsData = async () => {

      try {

        const taskResponse =
          await API.get("/tasks");


        setTasks(
          taskResponse.data
        );



        const meetingResponse =
          await API.get("/meetings");


        setMeetings(
          meetingResponse.data
        );


      } catch(error) {

        console.log(
          "Analytics Fetch Error:",
          error
        );

      }

    };


    fetchAnalyticsData();


  }, []);





  // =========================
  // TASK DATA
  // =========================


  const completedTasks =
    tasks.filter(
      (task) =>
        task.completed
    ).length;



  const pendingTasks =
    tasks.filter(
      (task) =>
        !task.completed
    ).length;



  const totalTasks =
    completedTasks +
    pendingTasks ||
    1;



  const completedTaskPercent =
    (completedTasks /
      totalTasks) *
    100;



  const pendingTaskPercent =
    (pendingTasks /
      totalTasks) *
    100;







  // =========================
  // MEETING DATA
  // =========================


  const upcomingMeetings =
    meetings.filter(
      (meeting) =>
        meeting.status ===
        "upcoming"
    ).length;



  const completedMeetings =
    meetings.filter(
      (meeting) =>
        meeting.status ===
        "completed"
    ).length;



  const cancelledMeetings =
    meetings.filter(
      (meeting) =>
        meeting.status ===
        "cancelled"
    ).length;




  const totalMeetings =
    upcomingMeetings +
    completedMeetings +
    cancelledMeetings ||
    1;



  const upcomingPercent =
    (upcomingMeetings /
      totalMeetings) *
    100;



  const completedPercent =
    (completedMeetings /
      totalMeetings) *
    100;






  const [completedKey,
    setCompletedKey] =
    useState(0);



  const [pendingKey,
    setPendingKey] =
    useState(0);






return (

<motion.div

className="analytics-page"

initial={{
opacity:0
}}

animate={{
opacity:1
}}

transition={{
duration:0.8
}}

>


<h1>
📊 Analytics Dashboard
</h1>





{/* MEETING CARD */}



<motion.div

className="analytics-card"

initial={{
opacity:0,
y:50
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.6
}}

whileHover={{
y:-10
}}

>


<h2>
📅 Meeting Status Overview
</h2>



<motion.div

className="pie-chart"

whileHover={{
scale:1.05,
rotate:15
}}

transition={{
type:"spring",
stiffness:200
}}


style={{

background:

`conic-gradient(

#3b82f6 0%
${upcomingPercent}%,

#10b981
${upcomingPercent}%
${upcomingPercent + completedPercent}%,

#ef4444
${upcomingPercent + completedPercent}%
100%

)`

}}


/>



<div className="legend">


<p>

<span className="blue"></span>

Upcoming:
{upcomingMeetings}

</p>



<p>

<span className="green"></span>

Completed:
{completedMeetings}

</p>



<p>

<span className="red"></span>

Cancelled:
{cancelledMeetings}

</p>



</div>



</motion.div>








{/* TASK CARD */}



<motion.div

className="analytics-card"

initial={{
opacity:0,
y:50
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.6,
delay:0.3
}}

whileHover={{
y:-10
}}

>



<h2>
📋 Task Completion Rate
</h2>





<div className="bar-container">



{/* COMPLETED */}



<div

className="bar-group"

onMouseLeave={()=>

setCompletedKey(
prev=>prev+1
)

}

>


<div className="bar-value">

{
Math.round(
completedTaskPercent
)
}%

</div>



<motion.div

key={completedKey}

className="bar completed-bar"


initial={{

height:
completedTaskPercent *
2.5

}}


whileHover={{

height:[

0,

completedTaskPercent *
2.5

]

}}


style={{

height:
completedTaskPercent *
2.5

}}


transition={{

duration:1.2,

ease:"easeOut"

}}


/>



<p>

Completed:
{completedTasks}

</p>


</div>







{/* PENDING */}





<div

className="bar-group"

onMouseLeave={()=>

setPendingKey(
prev=>prev+1
)

}

>


<div className="bar-value">

{
Math.round(
pendingTaskPercent
)
}%

</div>




<motion.div

key={pendingKey}

className="bar pending-bar"


initial={{

height:
pendingTaskPercent *
2.5

}}


whileHover={{

height:[

0,

pendingTaskPercent *
2.5

]

}}


style={{

height:
pendingTaskPercent *
2.5

}}



transition={{

duration:1.2,

ease:"easeOut"

}}


/>




<p>

Pending:
{pendingTasks}

</p>



</div>





</div>





</motion.div>




</motion.div>


);


}


export default Analytics;