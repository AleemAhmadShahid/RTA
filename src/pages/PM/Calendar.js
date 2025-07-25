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

import "../../styles/Calendar.css";
import FilterBox from "../../components/FilterBox";
import GenericPopup from "../../components/GenericPopup";

import FullCalendar from "@fullcalendar/react";
import { EmployeeContainer } from "../../components/EmployeeInfo";
import { AddButton } from "../CardsPopup";
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  
  top: 0;
  
  background-color: white;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
`;
const Box = styled.div`
  padding: 20px;
  background: #f5f5f5;
`;
const OuterBox = styled.div`
  padding: 20px;
  margin-right: 8px;
  
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
  gap: 10px;
`;

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
    { value: "calendar", label: "Calendar" },
    { value: "list", label: "List" },
    //{ value: "timeline", label: "Timeline" },
  ];

  const config = {
    "calendar": {
      intialView: 'dayGridMonth',
      views: [
        "dayGridMonth",
        "timeGridWeek",
        "timeGridDay",
     
      ],
      center: "dayGridMonth, timeGridWeek, timeGridDay",

    },
    "list": {
      intialView: 'listMonth',
      views: [
        "listWeek",
        "listMonth", 
        "listDay"
     
      ],
      center: "listWeek,listMonth,listDay",

    },
    // "timeline": {
    //   intialView: 'resourceTimeline',
    //   views: [
    //     "resourceTimeline",
        
     
    //   ],
    //   center: "resourceTimeline",

    // }
  };
  // const selectedOptionValue = "resourceTimeline"; // This can be dynamically set based on user selection
  // const initialView = CheckListOptions.find(option => option.value.includes(selectedOptionValue)).value;
  // const [checkListOption, setCheckListOption] = useState({
  //   value: {},
  //   label: "Board",
  // });

  const [checkListOption, setCheckListOption] = useState(CheckListOptions[0]);

  const handleCheckListOptionChange = (selectedOption) => {
    setCheckListOption(selectedOption);
  };
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    
    const selectedOption = CheckListOptions.find(
      (option) => option.value === selectedValue
    );
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
      <CenteredContainer style={{ backgroundColor: "#f5f5f5" }}>
        {/* <TopBar>
          <div style={{ display: "flex", alignItems: "center" }}>
            <HeadingContainer>
              <h4>Comming</h4>
              <h6 style={{ margin: 0 }}> Workspace </h6>
              <FilterBox
                width={"100%"}
                options={CheckListOptions}
                onValueChange={(selectedOption) =>
                  handleCheckListOptionChange(selectedOption)
                }
                selectedValue={checkListOption}
                title=""
                style={{ backgroundColor: "transparent" }}
              />
            </HeadingContainer>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
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
                padding: "20px",
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
                padding: "20px",
              }}
              onClick={openFiltersPopup}
            >
              Filters
            </AddButton>
          </div>
        </TopBar> */}

        <Box>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin , resourceTimelinePlugin ]}
            initialView={config[checkListOption.value].initialView}
            editable={true}
            resources= {[
              {"id": "1", "name": "A"}
            ]}
            events={[
              { title: "Event 1", start: "2024-06-01", image: "/RTA.png" },
              {
                title: "Event 2",
                start: "2024-06-05",
                end: "2024-06-07",
                image: "/RTA.png",
              },
              { title: "Event 3 ", start: "2024-06-01", image: "/RTA.png" },
              {
                title: "Event 4",
                start: "2024-06-05",
                end: "2024-06-07",
                image: "/RTA.png",
              },
            ]}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            views={config[checkListOption.value].views}
            buttonText= {{
              listWeek: 'List Week',
              listMonth: 'List Month',
              listDay: 'List Day'
            }}
            headerToolbar={{ center: config[checkListOption.value].center }}
            eventClassNames="custom-calendar"
          />
        </Box>
        {isPopupOpen && (
          <CardsPopup task={selectedTask} closeCardPopup={closePopup} />
        )}
      </CenteredContainer>
      {isFiltersPopupOpen && (
        <GenericPopup
          left={boxPosition.left - 120}
          top={boxPosition.top + 10}
          // heading={}
          fields={[
            {
              name: "Filters",
              type: "text",
              placeholder: "Dates",
            },
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
