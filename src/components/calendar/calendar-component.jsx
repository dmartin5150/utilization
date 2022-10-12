import React, { useState, useEffect } from "react";
import "./calendar-component.scss";
import Placard from "../placard/placard-component";
import PlacardBox from "../placard-box/placard-box-component";
import Pagination from "../pagination/pagination-component";
import "./calendar-day-component.scss";

const Calendar = ({
  admissionData,
  selectedDate,
  onDateChange,
  heading,
  pageSize = 12,
}) => {
  const calendarData = admissionData.map((data) => {
    return {
      key: data.date,
      id: data.date,
      title: data.date,
      focus: data.discharges,
      subtitle: "discharges",
    };
  });
  return (
    <PlacardBox
      placardData={calendarData}
      subtitle={"discharges"}
      heading={heading}
      placardClass={"calendar-day"}
      selectedPlacard={selectedDate}
      onPlacardChange={onDateChange}
      pageSize={12}
    />
  );
};
export default Calendar;
