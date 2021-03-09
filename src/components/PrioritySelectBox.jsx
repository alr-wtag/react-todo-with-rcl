import SelectBox from "@wtag/rcl-select-box";

//wrapper component to make use of the RCL component SelectBox 
//to dynamically select the task priority list 
const PrioritySelectBox = (props) => {
  const options = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  const {
    width,
    size,
    value,
    onValueChange,
    isClearable,
    isSearchable,
  } = props;

  return (
    <SelectBox
      width={width}
      size={size}
      isClearable={isClearable}
      isSearchable={isSearchable}
      onChange={onValueChange}
      value={value}
      options={options}
    />
  );
};

export default PrioritySelectBox;
