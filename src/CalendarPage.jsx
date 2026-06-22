import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.css";
import { motion, AnimatePresence } from "framer-motion";

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingTime, setMeetingTime] = useState("");

  const [meetings, setMeetings] = useState(() => {
    const savedMeetings = localStorage.getItem("meetings");

    if (!savedMeetings) return {};

    const parsedMeetings = JSON.parse(savedMeetings);

    // Add default status to old meetings
    Object.keys(parsedMeetings).forEach((date) => {
      parsedMeetings[date] = parsedMeetings[date].map(
        (meeting) => ({
          ...meeting,
          status: meeting.status || "upcoming",
        })
      );
    });

    return parsedMeetings;
  });

  useEffect(() => {
    localStorage.setItem(
      "meetings",
      JSON.stringify(meetings)
    );
  }, [meetings]);

  const selectedDate =
    date.toISOString().split("T")[0];

  const addMeeting = () => {
    if (
      !meetingTitle.trim() ||
      !meetingTime
    )
      return;

    setMeetings({
      ...meetings,

      [selectedDate]: [
        ...(meetings[selectedDate] || []),

        {
          title: meetingTitle,
          time: meetingTime,
          status: "upcoming",
        },
      ],
    });

    setMeetingTitle("");
    setMeetingTime("");
  };

  const deleteMeeting = (index) => {
    const updatedMeetings = {
      ...meetings,
    };

    updatedMeetings[selectedDate] =
      updatedMeetings[selectedDate].filter(
        (_, i) => i !== index
      );

    if (
      updatedMeetings[selectedDate]
        .length === 0
    ) {
      delete updatedMeetings[
        selectedDate
      ];
    }

    setMeetings(updatedMeetings);
  };

  const updateMeetingStatus = (
    index,
    status
  ) => {
    const updatedMeetings = {
      ...meetings,
    };

    updatedMeetings[selectedDate][
      index
    ].status = status;

    setMeetings(updatedMeetings);
  };

  const meetingsForDate = (
    meetings[selectedDate] || []
  ).sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  return (
    <div className="calendar-page">
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        📅 Meetings Calendar
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={({ date }) => {
            const dateString = date
              .toISOString()
              .split("T")[0];

            return meetings[dateString]
              ? "meeting-day"
              : null;
          }}
        />
      </motion.div>

      <motion.div
        className="meeting-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* AnimatePresence with mode="wait" + the date as key makes the
            whole meetings list fade/slide out and the new one fade in
            whenever the selected date changes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25 }}
          >
            <h2>
              Meetings for {selectedDate}
            </h2>

            <div className="meeting-input">
              <input
                type="text"
                placeholder="Meeting Title"
                value={meetingTitle}
                onChange={(e) =>
                  setMeetingTitle(
                    e.target.value
                  )
                }
              />

              <input
                type="time"
                value={meetingTime}
                onChange={(e) =>
                  setMeetingTime(
                    e.target.value
                  )
                }
              />

              <motion.button
                onClick={addMeeting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add
              </motion.button>
            </div>

            <AnimatePresence>
              {meetingsForDate.length > 0 ? (
                meetingsForDate.map(
                  (meeting, index) => (
                    <motion.div
                      key={`${meeting.title}-${meeting.time}-${index}`}
                      className="meeting-item"
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        transition: { duration: 0.2 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <strong>
                          {meeting.title}
                        </strong>

                        <p>
                          🕒 {meeting.time}
                        </p>

                        <p>
                          {meeting.status ===
                            "upcoming" &&
                            "🟢 Upcoming"}

                          {meeting.status ===
                            "completed" &&
                            "✅ Completed"}

                          {meeting.status ===
                            "cancelled" &&
                            "❌ Cancelled"}
                        </p>
                      </div>

                      <div className="meeting-actions">
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            updateMeetingStatus(
                              index,
                              "completed"
                            )
                          }
                        >
                          ✅
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            updateMeetingStatus(
                              index,
                              "cancelled"
                            )
                          }
                        >
                          ❌
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            updateMeetingStatus(
                              index,
                              "upcoming"
                            )
                          }
                        >
                          🟢
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            deleteMeeting(index)
                          }
                        >
                          🗑️
                        </motion.button>
                      </div>
                    </motion.div>
                  )
                )
              ) : (
                <motion.p
                  key="no-meetings"
                  className="no-meetings"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  No meetings scheduled.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default CalendarPage;
