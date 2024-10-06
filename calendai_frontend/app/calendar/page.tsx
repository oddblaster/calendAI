"use client";

import React from "react"
import Sidebar from "@/components/sidebar";

const API_KEY = "AIzaSyBNTurSIDjD8DiHSolcAooyVZFWxM7H2gE";

const CalendarPage = () => {

    return (
        <>
        <div className="w-lvh h-lvh bg-gray-900 text-white">
        <iframe src="https://embed.styledcalendar.com/#fyOCtCvtdd0sadow8o4w" title="Styled Calendar" className="w-full h-full" data-cy="calendar-embed-iframe"></iframe>
        <script async type="module" src="https://embed.styledcalendar.com/assets/parent-window.js"></script>
        </div>
        </>
    )
}

export default CalendarPage;