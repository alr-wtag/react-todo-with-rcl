import moment from "moment";

//removes an item from the either Pending/Completed tasks sections permanently
const removeListItem = (arr, id) => {
  const newArr = arr.filter((el) => el.uniqueId !== id);
  const obj = arr.filter((el) => el.uniqueId === id)[0];
  return { newArr: newArr, obj: obj };
};

//filter listItems and completeItem arrays on searching with appropriate searhValue name
const filterArrayOnSearch = (arr, searchValue) => {
  const refinedValue = searchValue.trim().toLowerCase();

  return refinedValue
    ? arr.filter((curr) => curr.title.includes(`${refinedValue}`))
    : arr;
};

//gets the current time when an object is being created/updated and calculates the time elapsed
const getRecentTime = () => {
  const timeNow = moment().toObject();

  const { years, months, date, hours, minutes, seconds } = timeNow;

  const dateFormat = `${years}-${months + 1}-${date}`;
  const timeFormat = `${hours}:${minutes}:${seconds}`;

  return { dateFormat:dateFormat, timeFormat:timeFormat };
};


export {
  removeListItem,
  filterArrayOnSearch,
  getRecentTime,
};
