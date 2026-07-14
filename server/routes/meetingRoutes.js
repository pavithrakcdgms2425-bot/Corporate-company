const express = require("express");
const router = express.Router();

const Meeting = require("../models/Meeting");
const verifyToken = require("../middleware/authMiddleware");


// GET ALL MEETINGS
router.get("/", verifyToken, async (req, res) => {
  try {

    const meetings = await Meeting.find({
      user: req.user.id,
    });

    res.json(meetings);

  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
});




// ADD MEETING
router.post("/", verifyToken, async (req,res)=>{

  try {

    const meeting = new Meeting({

      title:req.body.title,

      date:req.body.date,

      time:req.body.time,

      status:req.body.status || "upcoming",

      user:req.user.id

    });


    await meeting.save();


    res.status(201).json(meeting);


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});






// UPDATE MEETING STATUS
router.put("/:id", verifyToken, async(req,res)=>{

  try {


    const meeting =
      await Meeting.findOne({

        _id:req.params.id,

        user:req.user.id

      });



    if(!meeting){

      return res.status(404).json({
        message:"Meeting not found"
      });

    }



    meeting.status =
      req.body.status ??
      meeting.status;



    await meeting.save();


    res.json(meeting);



  } catch(error){


    res.status(500).json({
      message:error.message
    });


  }

});






// DELETE MEETING

router.delete("/:id", verifyToken, async(req,res)=>{


try {


const meeting =
await Meeting.findOneAndDelete({

_id:req.params.id,

user:req.user.id

});



if(!meeting){

return res.status(404).json({
message:"Meeting not found"
});

}



res.json({

message:"Meeting Deleted"

});



}catch(error){


res.status(500).json({
message:error.message
});


}


});



module.exports = router;