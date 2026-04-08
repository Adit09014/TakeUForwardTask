"use client"
import { useState, useRef, useEffect } from "react"

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  startOfDay,
  isToday
} from "date-fns"

export default function Grid({ currentDate }) {
  const menuRef = useRef(null)

  const [eventText, setEventText] = useState("")
  const [events, setEvents] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  // ADD EVENT
  const handleAddEvent = (date) => {
    if (!eventText) return

    setEvents([
      ...events,
      {
        date,
        title: eventText,
        color: "bg-green-500"
      }
    ])

    setEventText("")
  }

  // RANGE SELECTION
  const handleDateClick = (day) => {
    const d = startOfDay(day)

    if (startDate && endDate && isSameDay(endDate, d)) {
      setStartDate(null)
      setEndDate(null)
      return
    }

    if (startDate && isSameDay(startDate, d)) {
      setStartDate(null)
      return
    }

    if (!startDate || (startDate && endDate)) {
      setStartDate(d)
      setEndDate(null)
    } else {
      if (d < startDate) {
        setEndDate(startDate)
        setStartDate(d)
      } else {
        setEndDate(d)
      }
    }
  }

  // CALENDAR DAYS
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate))
  })

  // HELPERS
  const isStart = (day) => startDate && isSameDay(day, startDate)
  const isEnd = (day) => endDate && isSameDay(day, endDate)
  const isInRange = (day) => {
    if (!startDate || !endDate) return false
    return day > startDate && day < endDate
  }

  const isTodayCell = (day) => isToday(day)

  return (
    <div className="grid grid-cols-7 w-full border border-gray-700 text-white">

      {/* WEEK HEADERS */}
      {["SUN","MON","TUE","WED","THU","FRI","SAT"].map((d) => (
        <div key={d} className="text-center border border-gray-700 p-2 text-sm">
          {d}
        </div>
      ))}

      {/* DAYS */}
      {days.map((day) => {
        const isCurrentMonth = isSameMonth(day, currentDate)

        return (
          <div
            key={day}
            className={`group perspective aspect-square transition-all
    ${isToday(day) ? "shadow-[0_0_20px_4px_rgba(250,204,21,0.7)] z-10" : ""}`}
            onClick={() => handleDateClick(day)}
          >
            <div className="relative w-full h-full transition-transform duration-[900ms] ease-in-out transform-style preserve-3d group-hover:rotate-x-180">

              {/* FRONT */}
              <div
                className={`absolute inset-0 backface-hidden border border-gray-700 p-1 flex flex-col justify-between cursor-pointer
                  ${isCurrentMonth ? "bg-black" : "bg-gray-900 text-gray-500"}
                  ${isInRange(day) ? "bg-yellow-400" : ""}
                  ${isStart(day) ? "bg-yellow-600 text-black" : ""}
                  ${isEnd(day) ? "bg-yellow-600 text-black" : ""}
                `}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs">{format(day, "d")}</span>
                </div>

                {/* EVENTS */}
                {events
                  .filter(e => isSameDay(new Date(e.date), day))
                  .map((e, i) => (
                    <div key={i} className={`text-[10px] p-1 mt-1 rounded ${e.color}`}>
                      {e.title}
                    </div>
                  ))}
              </div>

              {/* BACK */}
              <div className="absolute inset-0 backface-hidden rotate-x-180 bg-gray-900 p-2 flex flex-col justify-between">

                {/* RANGE BUTTONS */}
                <div className="flex flex-col gap-2">

                  {/* START */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setStartDate(startOfDay(day))
                      setEndDate(null)
                    }}
                    className={`text-xs px-2 py-1 rounded border transition
                      ${isStart(day)
                        ? "bg-yellow-500 text-black border-yellow-500"
                        : "border-yellow-500 text-yellow-400 hover:shadow-[0_0_6px_#facc15]"
                      }
                    `}
                  >
                    Start Day
                  </button>

                  {/* END */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (startDate) setEndDate(startOfDay(day))
                    }}
                    className={`text-xs px-2 py-1 rounded border transition
                      ${isEnd(day)
                        ? "bg-yellow-500 text-black border-yellow-500"
                        : "border-yellow-500 text-yellow-400 hover:shadow-[0_0_6px_#facc15]"
                      }
                    `}
                  >
                    End Day
                  </button>

                </div>

                {/* ADD EVENT */}
                <div>
                  <input
                    value={eventText}
                    onChange={(e) => setEventText(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Add event"
                    className="w-full text-xs p-1 mb-1 bg-black border border-gray-600 text-white"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddEvent(day)
                    }}
                    className="w-full text-xs bg-blue-500 hover:bg-blue-600 p-1 rounded"
                  >
                    Add Event
                  </button>
                </div>

              </div>

            </div>
          </div>
        )
      })}
    </div>
  )
}