import Select from "react-select";

const styles = {
  valueContainer: (css) => ({
    ...css,
    flexWrap: "nowrap",
    role: "menuitemcheckbox",
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

function Cars(props) {
  return (
    <>
      <Select
        isClearable={true}
        className="selector-manufactor"
        styles={styles}
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
