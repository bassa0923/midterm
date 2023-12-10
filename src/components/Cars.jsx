/* eslint-disable react/prop-types */
import Select from "react-select";

function Cars(props) {
  return (
    <>
      <Select
        isClearable={true}
        className="selector-manufactor"
        styles={props.styles}
        options={props.cars}
        onChange={props.handleChange}
        value={props.selectedCarOptions}
        isMulti
        placeholder="მწარმოებელი"
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
      />
    </>
  );
}

export default Cars;
