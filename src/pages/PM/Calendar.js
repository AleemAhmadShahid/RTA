import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import { Calendar as FullCalendar } from "@fullcalendar/core";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // for date selecting, event dragging & resizing
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
import { CenteredContainer } from "../../styles/TableStyling";
import CardsPopup from "../CardsPopup";

import '../../styles/Calendar.css'; 
import FilterBox from "../../components/FilterBox";
import GenericPopup from "../../components/GenericPopup";


import FullCalendar from "@fullcalendar/react";
import { EmployeeContainer } from "../../components/EmployeeInfo";
import { AddButton } from "../CardsPopup";
const TopBar = styled.div`
  display: flex;
   justify-content: space-between;
  // align-items: center;
  // position: absolute;
  top: 0;
  // left: 50%;
  // transform: translateX(-50%);
  background-color: white;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
`;
const Box = styled.div`
  padding: 20px;
  background: #f5f5f5;
`;
const OuterBox = styled.div`
  padding: 25px;
  margin-right: 5px;
`;
const SuccessBadge = styled.span`
  background-color: yellow;
  color: white;
  padding: 0.5px 10px;
  border-radius: 4px;
  font-size: 12px;
`;
const UserImage = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;

  margin: 0px;
  margin-top: -10px;
`;

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Adjust the gap between headings */
`;

// const Calendar = () => {
//   const calendarRef = useRef(null);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   useEffect(() => {
//     const calendarEl = calendarRef.current;
//     const calendar = new FullCalendar(calendarEl, {
//       headerToolbar: { center: 'dayGridMonth,timeGridWeek,dayGridDay' }, 
//       plugins: [
//         interactionPlugin,
//         dayGridPlugin,
//         timeGridPlugin,
//         listPlugin,
//         multiMonthPlugin,
//         adaptivePlugin,
//         scrollGridPlugin,
//         timelinePlugin,
//         resourcePlugin,
//         resourceDayGridPlugin,
//         resourceTimeGridPlugin,
//         resourceTimelinePlugin,
//       ],
//       // initialView: "resourceTimeline",
//       initialView: 'dayGridMonth',
//       editable: true,
//       eventBackgroundColor: "lightgrey",
//       eventBorderColor: "lightgrey",
//       eventTextColor:"black",
//       eventClick: handleEventClick,
//       eventContent: (arg) => console.log(arg.event.extendedProps),
//         // eventContent: renderEventContent,

//       // events: [
//       //   { title: "Event 1", start: "2024-03-01", image: "/RTA.png" },
//       //   { title: "Event 2", start: "2024-03-05", end: "2024-03-07" },
//       //   { title: "My name is aleem and am going to be a pilot aaaaaaaaaaaaaaaaaa aaaa a a a", start: "2024-03-01" },
//       //   { title: "Event 4", start: "2024-03-05", end: "2024-03-07" },
//       // ],
//       // resources: [
//       //   { id: 'a', title: 'Resource A' },
//       //   { id: 'b', title: 'Resource B' },
//       //   { id: 'c', title: 'Resource C' },
//       //   // Add more resources as needed
//       // ],
//       eventColor:"Green",
//       resources: 'https://fullcalendar.io/api/demo-feeds/resources.json?with-nesting&with-colors',
//     events: 'https://fullcalendar.io/api/demo-feeds/events.json?single-day&for-resource-timeline'
//     });
//     calendar.render();
//     return () => {
//       calendar.destroy();
//     };
//   }, []);

//   const handleEventClick = (info) => {
//     setSelectedTask(info.event);
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//   };

//   const renderEventContent = (eventInfo) => {
//     return (
//       <div className="event-content">
//         <SuccessBadge /> 
//         <span>{eventInfo.timeText}</span>
//         <p className="event-title">{eventInfo.event.title}</p>
//       </div>
//     );
//   };
  
  
//   return (
//     <OuterBox>
//     <CenteredContainer style={{ backgroundColor: "white" }}>
//       <Box>
//         <div ref={calendarRef} className="custom-calendar" />
//       </Box>
//       {isPopupOpen && (
//         <CardsPopup
//           task={selectedTask}
//           closeCardPopup={closePopup}
//           // Pass other necessary props here
//         />
//       )}
//     </CenteredContainer>
//     </OuterBox>
//   );
// };
 


const Calendar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const calendarRef = useRef(null);
  const handleEventClick = (info) => {
    setSelectedTask(info.event);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const CheckListOptions = [
    { value: "dayGridMonth,timeGridWeek", label: "Calendar" },
    { value: "listWeek,listMonth", label: "List" },
    { value: "timeGridWeek,timeGridDay", label: "Timeline" },
  ];

  const [checkListOption, setCheckListOption] = useState({
    value: {},
    label: "Board",
  });

  const handleCheckListOptionChange = (selectedOption) => {
    setCheckListOption(selectedOption);
  };





  const [boxPosition, setBoxPosition] = useState({ left: 0, top: 0 });
  const [isFiltersPopupOpen, setIsFiltersPopupOpen] = useState(false);
  const openFiltersPopup = (event) => {
    const clickedDiv = event.currentTarget;
    const rect = clickedDiv.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;

    setBoxPosition({ left, top });
    console.log(left, top);

    setIsFiltersPopupOpen(true);
  };
  const closeFiltersPopup = () => {
    setIsFiltersPopupOpen(false);
  };













  return (
    <OuterBox>
      <CenteredContainer style={{ backgroundColor: "white" }} >
       <TopBar>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <HeadingContainer>
      <h4>Comming</h4>
      <h6 style={{ margin: 0 }}> Workspace </h6>
      <FilterBox
        width={"100%"}
        options={CheckListOptions}
        onValueChange={(selectedOption) =>
          setCheckListOption(selectedOption)
        }
        selectedValue={checkListOption}
        title=""
        style={{ backgroundColor: "transparent" }}
      />
    </HeadingContainer>
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
  <AddButton
      style={{
        width: "100%",
        height: "40px",
        marginRight: "10px",
        marginTop: "3px",
        backgroundColor: " #f5f5f5",
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        padding:"20px",
      }}
    >
      Automations
    </AddButton>
    <AddButton
      style={{
        width: "100%",
        height: "40px",
        marginRight: "10px",
        marginTop: "3px",
        backgroundColor: " #f5f5f5",
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        padding:"20px",
      }}
      onClick={openFiltersPopup}
    >
      Filters
    </AddButton>
    
  </div>
</TopBar>

        <Box>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            editable={true}
            events={[
              { title: "Event 1", start: "2024-04-01", image: "/RTA.png" },
              {
                title: "Event 2",
                start: "2024-04-05",
                end: "2024-03-07",
                image: "/RTA.png",
              },
              { title: "Event 3 ", start: "2024-03-01", image: "/RTA.png" },
              {
                title: "Event 4",
                start: "2024-04-05",
                end: "2024-03-07",
                image: "/RTA.png",
              },
            ]}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            headerToolbar={{ center: "dayGridMonth,timeGridWeek" }}
            eventClassNames="custom-calendar"
          />
        </Box>
        {isPopupOpen && (
          <CardsPopup task={selectedTask} closeCardPopup={closePopup} />
        )}
      </CenteredContainer>
      {isFiltersPopupOpen && (
        <GenericPopup
          left={boxPosition.left-120}
          top={boxPosition.top+10}
          // heading={}
          fields={[
            {
              name: "Filters",
              type: "text",
              placeholder: "Dates",
            },
            // Add other fields as needed
          ]}
          onClose={closeFiltersPopup}
          // onSubmit={(formValues) => {
          //   console.log("Member form submitted:", formValues);
          // }}
          buttonText="Add "
        />
      )}
    </OuterBox>
  );
};

const renderEventContent = (eventInfo) => {
  return (
    <div className="event-content">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <EmployeeContainer>
          <SuccessBadge style={{ backgroundColor: "green", color: "white" }}>
            Success
          </SuccessBadge>
          <p className="event-title">{eventInfo.event.title}</p>
        </EmployeeContainer>
        <UserImage
          src={eventInfo.event.extendedProps.image}
          alt="Event"
          className="event-image"
        />
      </div>
      <span>{eventInfo.timeText}</span>
      {/* <p className="event-title">{eventInfo.event.title}</p> */}
    </div>
  );
};
export default Calendar;
