import React from "react";
import { mount } from "enzyme";

import ListItem from "../components/ListItem";
import dummyListItems from "./dummyProps";

const listBlockFullTitle = '.list-block__full-title'
const btnContainer = ".list-block__list-item__btn-container";
const btnClass = btnContainer + "__btn";

const listItemWrapperMount = (customProps, mainProps = dummyListItems[0]) => {
  return mount(<ListItem {...mainProps} {...customProps} />);
};

const pendingWrapperItem = listItemWrapperMount({ onPendingList: true });
const completeWrapperItem = listItemWrapperMount({ onPendingList: false });

const { serial, id, title } = dummyListItems[0];

describe("Tests if the components render inside the ListItem component", () => {
  test("button container renders inside the ListItem", () => {
    expect(pendingWrapperItem.find(btnContainer).length).toEqual(1);
  });

  test("all 3 buttons render inside the ListItem if it belongs to pending task category", () => {
    expect(pendingWrapperItem.find(btnClass).length).toEqual(3);
  });

  test("2 buttons render if the listItem belongs to completed task category", () => {
    expect(completeWrapperItem.find(btnClass).length).toEqual(2);
  });

  test("check if undo button is present if an item belongs to completed task category", () => {
    expect(
      completeWrapperItem
        .find(btnClass)
        .at(0)
        .hasClass(btnClass.slice(1, btnClass.length) + "--undo")
    ).toEqual(true);
  });

  test("check if see more icon renders when the title gets too long and if full title block renders when see more button gets clicked", () => {
    const customListItemWrapper = listItemWrapperMount(
      { onPendingList: true },
      {
        ...dummyListItems[0],
        title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      }
    );

    const seeMoreButton = customListItemWrapper.find(btnClass+'--more')

    expect(seeMoreButton.length).toEqual(1)
    seeMoreButton.simulate("click")

    expect(customListItemWrapper.find(listBlockFullTitle).length).toEqual(1)
    seeMoreButton.simulate("click")

    expect(customListItemWrapper.find(listBlockFullTitle).length).toEqual(0)
  });

});

describe("Tests the functionalities of the listItems when on pending tasks list", () => {
  test("Tests if edit function callback works when an item is on pending tasks list", () => {
    const onEditing = jest.fn();

    const customPendingWrapperItem = listItemWrapperMount({
      onPendingList: true,
      onEditing: onEditing,
    });

    customPendingWrapperItem.find(btnClass + "--edit").simulate("click");

    expect(onEditing).toHaveBeenCalledWith(serial, id, title);
  });

  test("Tests if delete function callback works when an item is on pending tasks list", () => {
    const removeItem = jest.fn();
    const customePendingWrapperItem = listItemWrapperMount({
      onPendingList: true,
      removeItem: removeItem,
    });

    customePendingWrapperItem.find(btnClass + "--delete").simulate("click");

    expect(removeItem).toHaveBeenCalledWith(serial);
  });

  test("Tests if done function callback works when an item is on pending tasks list", () => {
    const completeStatus = jest.fn();
    const customPendingWrapperItem = listItemWrapperMount({
      onPendingList: true,
      completeStatus: completeStatus,
    });

    customPendingWrapperItem.find(btnClass + "--done").simulate("click");

    expect(completeStatus).toHaveBeenCalledWith(serial);
    
  });
  
});
