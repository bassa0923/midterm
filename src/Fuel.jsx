import Select from "react-select";

const styles = {
  valueContainer: (css) => ({
    ...css,
    flexWrap: "nowrap",
  }),
  multiValueRemove: () => {
    return {
      display: "none",
    };
  },
  multiValue: () => {
    return {
      backgroundColor: "white",
    };
  },
};

function Fuel(props) {
  return (
    <>
      <Select
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isClearable={true}
        styles={styles}
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
