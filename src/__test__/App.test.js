import React from "react";
import { mount } from "enzyme";
import renderer from 'react-test-renderer'

import dummyListItems from "./dummyProps";

import App from "../App";

const inputTextArea = ".input-container__input-section__input";
const inputAddBtn = ".input-container__input-section__btn--add";
const inputSearchArea = ".search-container__input-section__input";
const emptyBoard = ".empty-board";
const listBlockDom = ".list-block";
const listBlockTitle = listBlockDom + "__list-item__list-title";
const btnContainer = ".list-block__list-item__btn-container";
const btnClass = btnContainer + "__btn";

const wrapper = mount(<App />);
const input = wrapper.find(inputTextArea);
const searchInput = wrapper.find(inputSearchArea);
const button = wrapper.find(inputAddBtn);

const targetProps = {
  scrollHeight: 40,
  style: { height: "40px" },
};

const changeInput = (inputDom, inputValue = "") => {
  inputDom.simulate("change", {
    target: { value: inputValue, ...targetProps },
  });
};

const clickBtnOfAListItem = (sectionPos, btnClassName) => {
  const firstListItem = wrapper
    .find("ListSection")
    .at(sectionPos)
    .find(listBlockDom)
    .first();

  firstListItem
    .find(btnClass + `--${btnClassName}`)
    .at(0)
    .simulate("click");
};

//checks default render in the Todo App
describe("Test default components render in App", () => {
  test("input container render", () =>
    expect(wrapper.find(inputTextArea).length).toEqual(1));
  test("input add button render", () =>
    expect(wrapper.find(inputAddBtn).length).toEqual(1));

  test("search input section render in App", () => {
    expect(wrapper.find(inputSearchArea).length).toEqual(1);
  });

  test("emptyboard render", () =>
    expect(wrapper.find(emptyBoard).length).toEqual(1));
});

//checks the default functionalities in the input section
describe("Tests key functionalities of input section", () => {
  test("Change in input field happens", () => {
    changeInput(input, "This is a text");

    const inputAfter = wrapper.find(inputTextArea);

    expect(inputAfter.props().value).toBe("This is a text");
  });

  test("plus button must add more than one task successfully", () => {
    dummyListItems.forEach((curr) => {
      changeInput(input, curr.title);
      button.simulate("click");
    });

    expect(wrapper.find(listBlockDom).length).toEqual(dummyListItems.length);
  });

  test("check if clicking on edit populates the input field and returns the listItem as edited", () => {
    const firstListItemTitle = wrapper.find(listBlockTitle).at(0).text();

    const firstListItemEditBtn = wrapper.find(btnClass + "--edit").at(0);

    firstListItemEditBtn.simulate("click");

    expect(wrapper.find(inputTextArea).prop('value')).toEqual(
      firstListItemTitle
    );

    changeInput(input, wrapper.find(inputTextArea).prop('value') + " edited!");
    button.simulate("click");

    expect(wrapper.find(listBlockTitle).at(0).text()).not.toEqual(
      firstListItemTitle
    );
  });
});

describe("Test if clicking done/undo on a list Item in one section places it on another section", () => {
  test("clicking done on an item in Pending tasks places it on Completed tasks section", () => {
    var listSectionLengthBefore = wrapper
      .find(".list-section")
      .first()
      .children("ListItem").length;

    clickBtnOfAListItem(0, "done");

    const listSectionLengthAfter = wrapper
      .find(".list-section")
      .first()
      .children("ListItem").length;

    expect(listSectionLengthAfter).toBeLessThan(listSectionLengthBefore);
  });

  test("clicking undo on an item in Completed tasks places it back to the Pending tasks", () => {
    //put the first list from pending tasks to the completed tasks list
    clickBtnOfAListItem(0, "done");

    const completeSectionLengthBefore = wrapper
      .find(".list-section")
      .last()
      .children("ListItem").length;

    clickBtnOfAListItem(1, "undo");

    const completeSectionLengthAfter = wrapper
      .find(".list-section")
      .last()
      .children("ListItem").length;

    expect(completeSectionLengthAfter).toBeLessThan(
      completeSectionLengthBefore
    );
  });
});

describe("Tests if the search option filters out the lists displayed on the list container", () => {
  test("checks if input change happens in the search filter", () => {
    changeInput(searchInput, "This is my Task 3 !");
    const searchInputAfter = wrapper.find(inputSearchArea).prop('value')
    expect(searchInputAfter).toBe("This is my Task 3 !");
  });
});

//Snapshot testing !
describe("Check if layout changes after searching is done", () => {
  test("test if the snapshot testing for search works", () => {
    
  })
})
