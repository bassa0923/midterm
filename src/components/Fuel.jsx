/* eslint-disable react/prop-types */
import Select from "react-select";

function Fuel(props) {
  return (
    <>
      <Select
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isClearable={true}
        styles={props.styles}
        className="selector-manufactor"
        options={props.fuel}
        onChange={props.fuelChange}
        isMulti
        placeholder="საწვავი"
      />
    </>
  );
}

export default Fuel;
