import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Calendar as FullCalendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // for date selecting, event dragging & resizing
import dayGridPlugin from '@fullcalendar/daygrid'; // for month and dayGrid views
import timeGridPlugin from '@fullcalendar/timegrid'; // for timeGrid views
import listPlugin from '@fullcalendar/list'; // for list views
import multiMonthPlugin from '@fullcalendar/multimonth'; // for multi-month views
import adaptivePlugin from '@fullcalendar/adaptive'; // for print optimization
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import timelinePlugin from '@fullcalendar/timeline';
import resourcePlugin from '@fullcalendar/resource';
import resourceDayGridPlugin from '@fullcalendar/resource-daygrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { CenteredContainer } from "../pages/styles/TableStyling";


const Calendar = () => {
  const calendarRef = useRef(null);

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
            resourceTimelinePlugin
          ],
          initialView: 'dayGridMonth', // initial view
          editable: true,
      events: [ // your event data
        { title: 'Event 1', start: '2024-03-01' },
        { title: 'Event 2', start: '2024-03-05',end:'2024-03-07' }
        // add more events as needed
      ]
    });
    calendar.render();
    return () => {
      calendar.destroy(); // cleanup when component unmounts
    };
  }, []);
  
  return (
    <CenteredContainer styles={{background:'white'}}>
      <div ref={calendarRef} />
    </CenteredContainer>
  );
}

export default Calendar;
