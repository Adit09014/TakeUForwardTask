"use client"

import { useState, useEffect } from "react"
import Grid from "./components/CalendarGrid.jsx"


export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [notes, setNotes] = useState<Record<string, string>>({})
  const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`


  const changeMonth = (dir) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + dir)
    setCurrentDate(newDate)
  }

  useEffect(() => {
    const saved = localStorage.getItem("calendar-notes")
    if (saved) setNotes(JSON.parse(saved))
  }, [])

  const monthImages = [
    "https://wallpapers.com/images/featured/winter-season-pictures-t6jheosv0awzd74t.jpg", // Jan
    "https://cms.accuweather.com/wp-content/uploads/2020/12/pexels-pixabay-259620.jpg?w=632", // Feb
    "https://radiant.edu.np/wp-content/uploads/2025/04/Spring-season-scaled.jpg", // Mar
    "https://guideposts.org/wp-content/uploads/2018/04/cherry_blossoms.jpg.optimal.jpg", // Apr
    "https://media.cnn.com/api/v1/images/stellar/prod/210316134738-02-wisdom-project-summer.jpg?q=w_3568,h_2006,x_0,y_0,c_fill", // May
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VtbWVyJTIwc2Vhc29ufGVufDB8fDB8fHww", // Jun
    "https://static.vecteezy.com/system/resources/thumbnails/030/530/458/small_2x/house-in-the-middle-of-the-forest-in-the-rainy-season-photo.jpg", // Jul
    "https://www.solitarytraveller.com/wp-content/uploads/2025/04/Best-Places-Visit-India-During-Rainy-Season-banner.webp", // Aug
    "https://media.cnn.com/api/v1/images/stellar/prod/210316134817-03-wisdom-project-autumn.jpg?q=w_4000,h_2250,x_0,y_0,c_fill", // Sep
    "https://m.media-amazon.com/images/I/71sY1l4N01L.jpg", // Oct
    "https://jurlique.com/cdn/shop/articles/headerbanner_copy.jpg?v=1695144941&width=1920", // Nov
    "https://images.unsplash.com/photo-1636777405172-37604daaa12b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmVzdGl2ZSUyMHNlYXNvbnxlbnwwfHwwfHx8MA%3D%3D"  // Dec
  ]

  const currentMonth = currentDate.getMonth()
  return (
    <main className="h-screen w-screen bg-black">
      <div className="w-full h-full bg-black flex items-center justify-center p-4">
        <div className="w-full h-full max-w-[1400px] rounded-2xl border border-gray-800 shadow-[0_0_30px_rgba(255,255,255,0.05)]">

        <div className="grid grid-cols-1 md:grid-cols-[35%_65%] h-full ">

          {/* LEFT SIDE */}
          <div className="flex flex-col h-full border-r border-gray-800 min-h-0">

          {/* IMAGE */}
          <div className="flex-[2] relative">
            <img
              src={monthImages[currentMonth]}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* NOTES */}
          <div className="flex-1 p-4 bg-black overflow-hidden">
            <h2 className="text-lg text-white mb-2">Notes</h2>
            <div
              contentEditable
              suppressContentEditableWarning
              onFocus={(e) => {
                if (!notes[monthKey]) e.currentTarget.innerText = ""
              }}
              onBlur={(e) => {
                const text = e.currentTarget.innerText.trim()
                setNotes({
                  ...notes,
                  [monthKey]: text
                })
              }}
              className={`w-full h-full bg-gray-900/60 border border-gray-700 rounded-lg p-3 text-sm outline-none overflow-auto
                ${notes[monthKey] ? "text-white" : "text-gray-500"}
              `}
            >
              {notes[monthKey] || "Write your notes..."}
            </div>
          </div>

        </div>

          {/* RIGHT SIDE */}
          <div className="p-4 h-full text-white flex flex-col overflow-hidden">

            {/* MONTH HEADER */}
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => changeMonth(-1)}>◀</button>
              <h2 className="text-xl font-semibold">
                {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
              </h2>
              <button onClick={() => changeMonth(1)}>▶</button>
            </div>

            <div className="flex-1">
              <div className="h-full">
                <Grid currentDate={currentDate} />
              </div>
            </div>

          </div>

        </div>

      </div>
      </div>
    </main>
  )
}