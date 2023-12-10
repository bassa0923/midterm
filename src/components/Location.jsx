/* eslint-disable react/prop-types */
import Select from "react-select";

function Location(props) {
  return (
    <>
      <Select
        isClearable={location}
        className="selector-manufactor"
        styles={props.styles}
        options={props.location}
        onChange={props.locationChange}
        isMulti
        placeholder="მდებარეობა"
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
      />
    </>
  );
}

export default Location;
