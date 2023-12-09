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

function Location(props) {
  return (
    <>
      <Select
        isClearable={location}
        className="selector-manufactor"
        styles={styles}
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
