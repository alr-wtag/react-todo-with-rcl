import { v1 as uuidv1 } from "uuid";

const dummyListItems = [
  {
    id: uuidv1(),
    serial: 1,
    title: "This is my Task 1 !",
  },

  {
    id: uuidv1(),
    serial: 2,
    title: "This is my Task 2 !",
  },

  {
    id: uuidv1(),
    serial: 3,
    title: "This is my Task 3 !",
  },
];

export default dummyListItems;
