import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.css";
import { motion, AnimatePresence } from "framer-motion";

import API from "./axios";


function CalendarPage() {

  const [date, setDate] =
    useState(new Date());


  const [meetingTitle, setMeetingTitle] =
    useState("");


  const [meetingTime, setMeetingTime] =
    useState("");


  const [meetings, setMeetings] =
    useState([]);



  // Fetch meetings from MongoDB

  useEffect(() => {

    const fetchMeetings = async () => {

      try {

        const response =
          await API.get("/meetings");


        setMeetings(response.data);


      } catch(error){

        console.log(
          "Fetch Meetings Error:",
          error
        );

      }

    };


    fetchMeetings();


  }, []);




  const selectedDate =
    date.toISOString().split("T")[0];




  // Add Meeting

  const addMeeting = async () => {


    if(
      !meetingTitle.trim() ||
      !meetingTime
    )
      return;



    try {


      const response =
        await API.post(
          "/meetings",
          {

            title: meetingTitle,

            date:selectedDate,

            time:meetingTime,

            status:"upcoming"

          }
        );



      setMeetings([
        ...meetings,
        response.data
      ]);



      setMeetingTitle("");

      setMeetingTime("");



    } catch(error){

      console.log(
        "Add Meeting Error:",
        error
      );

    }


  };







  // Delete Meeting


  const deleteMeeting = async(id)=>{


    try {


      await API.delete(
        `/meetings/${id}`
      );



      setMeetings(
        meetings.filter(
          meeting =>
          meeting._id !== id
        )
      );


    }catch(error){

      console.log(
        "Delete Error:",
        error
      );

    }


  };







  // Update Status


  const updateMeetingStatus =
  async(id,status)=>{


    try {


      const response =
        await API.put(
          `/meetings/${id}`,
          {
            status
          }
        );



      setMeetings(

        meetings.map(
          meeting =>
          meeting._id === id
          ?
          response.data
          :
          meeting
        )

      );



    }catch(error){


      console.log(
        "Update Status Error:",
        error
      );


    }


  };






  const meetingsForDate =

    meetings

    .filter(
      meeting =>
      meeting.date === selectedDate
    )

    .sort(
      (a,b)=>
      a.time.localeCompare(b.time)
    );






return (

<div className="calendar-page">



<motion.h1

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

📅 Meetings Calendar

</motion.h1>






<motion.div

initial={{
opacity:0,
scale:0.97
}}

animate={{
opacity:1,
scale:1
}}

transition={{
duration:0.4
}}

>


<Calendar

onChange={setDate}

value={date}


tileClassName={({date})=>{


const dateString =
date.toISOString()
.split("T")[0];



return meetings.some(
meeting =>
meeting.date === dateString
)

?
"meeting-day"
:
null;


}}


/>


</motion.div>







<motion.div

className="meeting-card"

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.4,
delay:0.2
}}

>




<AnimatePresence mode="wait">


<motion.div

key={selectedDate}

initial={{
opacity:0,
x:15
}}

animate={{
opacity:1,
x:0
}}

exit={{
opacity:0,
x:-15
}}

transition={{
duration:0.25
}}

>



<h2>

Meetings for {selectedDate}

</h2>





<div className="meeting-input">


<input

type="text"

placeholder="Meeting Title"

value={meetingTitle}

onChange={
(e)=>
setMeetingTitle(
e.target.value
)
}

/>



<input

type="time"

value={meetingTime}

onChange={
(e)=>
setMeetingTime(
e.target.value
)
}

/>



<motion.button

onClick={addMeeting}

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

>

Add

</motion.button>



</div>







<AnimatePresence>


{
meetingsForDate.length > 0

?

meetingsForDate.map(
(meeting)=>(


<motion.div

key={meeting._id}

className="meeting-item"

layout

initial={{
opacity:0,
y:-10
}}

animate={{
opacity:1,
y:0
}}

exit={{
opacity:0,
scale:0.9
}}

>


<div>


<strong>
{meeting.title}
</strong>



<p>
🕒 {meeting.time}
</p>




<p>


{
meeting.status==="upcoming"
&&
"🟢 Upcoming"
}



{
meeting.status==="completed"
&&
"✅ Completed"
}



{
meeting.status==="cancelled"
&&
"❌ Cancelled"
}



</p>


</div>





<div className="meeting-actions">


<motion.button

whileHover={{
scale:1.15
}}

onClick={()=>
updateMeetingStatus(
meeting._id,
"completed"
)
}

>

✅

</motion.button>





<motion.button

whileHover={{
scale:1.15
}}

onClick={()=>
updateMeetingStatus(
meeting._id,
"cancelled"
)
}

>

❌

</motion.button>





<motion.button

whileHover={{
scale:1.15
}}

onClick={()=>
updateMeetingStatus(
meeting._id,
"upcoming"
)
}

>

🟢

</motion.button>





<motion.button

whileHover={{
scale:1.15
}}

onClick={()=>
deleteMeeting(
meeting._id
)
}

>

🗑️

</motion.button>




</div>




</motion.div>


)


)


:

<motion.p

className="no-meetings"

initial={{
opacity:0
}}

animate={{
opacity:1
}}

>

No meetings scheduled.

</motion.p>


}


</AnimatePresence>



</motion.div>


</AnimatePresence>



</motion.div>




</div>


);


}


export default CalendarPage;