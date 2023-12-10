/* eslint-disable react/prop-types */
import { YearRangePicker } from "react-year-range-picker";

function Years(props) {
  return (
    <div>
      <YearRangePicker
        classNames="yearPicker"
        startText="წლიდან"
        endText="წლამდე"
        spacer="-"
        minYear={"1900"}
        maxYear={new Date().getFullYear()}
        onSelect={(startYear, endYear) => {
          props.yearChange(startYear, endYear);
        }}
        startYear={props.startYear}
        endYear={props.endYear}
      />
    </div>
  );
}

export default Years;
