import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Calendar as FullCalendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction"; // for date selecting, event dragging & resizing
import dayGridPlugin from "@fullcalendar/daygrid"; // for month and dayGrid views
import timeGridPlugin from "@fullcalendar/timegrid"; // for timeGrid views
import listPlugin from "@fullcalendar/list"; // for list views
import multiMonthPlugin from "@fullcalendar/multimonth"; // for multi-month views
import adaptivePlugin from "@fullcalendar/adaptive"; // for print optimization
import scrollGridPlugin from "@fullcalendar/scrollgrid";
import timelinePlugin from "@fullcalendar/timeline";
import resourcePlugin from "@fullcalendar/resource";
import resourceDayGridPlugin from "@fullcalendar/resource-daygrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { CenteredContainer } from "../pages/styles/TableStyling";
import CardsPopup from "../pages/CardsPopup";
import "./Calendar.css";
import { SuccessBadge } from "../pages/styles/TableStyling";
const Box = styled.div`
   padding: 20px;
`;
const OuterBox = styled.div`
  padding: 25px;
  margin-right:5px;
`;


const Calendar = () => {
  const calendarRef = useRef(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  useEffect(() => {
    const calendarEl = calendarRef.current;
    const calendar = new FullCalendar(calendarEl, {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        multiMonthPlugin,
        adaptivePlugin,
        scrollGridPlugin,
        timelinePlugin,
        resourcePlugin,
        resourceDayGridPlugin,
        resourceTimeGridPlugin,
        resourceTimelinePlugin,
      ],
      // initialView: "resourceTimeline",
      initialView: 'dayGridMonth',
      editable: true,
      eventBackgroundColor: "lightgrey",
      eventBorderColor: "lightgrey",
      eventTextColor:"black",
      eventClick: handleEventClick,
        // eventContent: renderEventContent,

      // events: [
      //   { title: "Event 1", start: "2024-03-01", image: "/RTA.png" },
      //   { title: "Event 2", start: "2024-03-05", end: "2024-03-07" },
      //   { title: "My name is aleem and am going to be a pilot aaaaaaaaaaaaaaaaaa aaaa a a a", start: "2024-03-01" },
      //   { title: "Event 4", start: "2024-03-05", end: "2024-03-07" },
      // ],
      // resources: [
      //   { id: 'a', title: 'Resource A' },
      //   { id: 'b', title: 'Resource B' },
      //   { id: 'c', title: 'Resource C' },
      //   // Add more resources as needed
      // ],
      eventColor:"Green",
      resources: 'https://fullcalendar.io/api/demo-feeds/resources.json?with-nesting&with-colors',
    events: 'https://fullcalendar.io/api/demo-feeds/events.json?single-day&for-resource-timeline'
    });
    calendar.render();
    return () => {
      calendar.destroy();
    };
  }, []);

  const handleEventClick = (info) => {
    setSelectedTask(info.event);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div className="event-content">
        <SuccessBadge /> 
        <span>{eventInfo.timeText}</span>
        <p className="event-title">{eventInfo.event.title}</p>
      </div>
    );
  };
  
  
  return (
    <OuterBox>
    <CenteredContainer style={{ backgroundColor: "white" }}>
      <Box>
        <div ref={calendarRef} className="custom-calendar" />
      </Box>
      {isPopupOpen && (
        <CardsPopup
          task={selectedTask}
          closeCardPopup={closePopup}
          // Pass other necessary props here
        />
      )}
    </CenteredContainer>
    </OuterBox>
  );
};

export default Calendar;
