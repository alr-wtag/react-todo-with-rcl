import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./App.scss";

import PrioritySelectBox from "./components/PrioritySelectBox";
import SectionContainer from "./components/SectionContainer";
import ListSection from "./components/ListSection";
import { Textarea } from "@wtag/react-comp-lib";
import IconButton from "@wtag/rcl-icon-button";
import Icon from "@wtag/rcl-icon";
import Card from "@wtag/rcl-card";

import {
  removeListItem,
  filterArrayOnSearch,
  getRecentTime,
} from "./functions";

const setRange = (text, low, high) => text.length > low && text.length <= high;

const App = () => {
  const [prioritySelected, setPrioritySelected] = useState({
    value: "Medium",
    label: "Medium",
  });
  const [inputTitle, setInputTitle] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [completeItems, setCompleteItems] = useState(
    () => JSON.parse(localStorage.getItem("completed_tasks")) || []
  );
  const [listItems, setListItems] = useState(
    () => JSON.parse(localStorage.getItem("pending_tasks")) || []
  );

  //checks if one of the list sections is empty
  const emptySectionConditioner = () => {
    return (
      fullEmptyContainer() ||
      (filterArrayOnSearch(listItems, searchValue).length === 1 &&
        editingItemId) ||
      (filterArrayOnSearch(listItems, searchValue).length === 1 &&
        editingItemId)
    );
  };

  //checks if both of the list sections are empty
  const fullEmptyContainer = () =>
    filterArrayOnSearch(listItems, searchValue).length === 0 &&
    filterArrayOnSearch(completeItems, searchValue).length === 0;

  useEffect(() => {
    localStorage.setItem("completed_tasks", JSON.stringify([...completeItems]));
    localStorage.setItem("pending_tasks", JSON.stringify([...listItems]));
    //eslint-disable-next-line
  }, [listItems.length, completeItems.length]);


//adds a new listItem to the pending task section
//or, edits an item and puts it back to the pending task section
  const addListItem = () => {
    if (inputTitle.trim().length !== 0) {
      const { dateFormat, timeFormat } = getRecentTime();

      if (editingItemId) {
        let itemId = editingItemId.id;
        let arrId;
        var editingObj = listItems.filter((el, idx) => {
          if (el.uniqueId === itemId) {
            arrId = idx;
            return true;
          }
          return false;
        })[0];

        listItems[arrId] = {
          ...editingObj,
          title: inputTitle.trim().toLowerCase(),
          priority: prioritySelected.value,
          dateUpdated: `${dateFormat} ${timeFormat}`,
        };

        setListItems((prevArr) => [...prevArr]);
        setEditingItemId(null);
      } else {
        setListItems((prevArr) => [
          ...prevArr,
          {
            uniqueId: prevArr.length + 1,
            title: inputTitle.trim().toLowerCase(),
            priority: prioritySelected.value,
            dateCreated: `${dateFormat} ${timeFormat}`,
            dateUpdated: `${dateFormat} ${timeFormat}`,
          },
        ]);
      }

      setInputTitle("");
    }
  };

  //check marks an item as done in pending tasks section
  //puts it back to the complete tasks section
  const doneWithListItem = (id) => {
    const { newArr, obj } = removeListItem(listItems, id);
    setListItems([...newArr]);
    setCompleteItems((prevItems) => [...prevItems, { ...obj }]);
  };

  //unchecks an item in the complete tasks section
  //puts it back to the pending tasks section
  const undoCompletedItem = (id) => {
    const { newArr, obj } = removeListItem(completeItems, id);
    setCompleteItems([...newArr]);
    setListItems((prevItems) => [...prevItems, { ...obj }]);
  };

  //deletes an item from the complete tasks section
  const removeFromCompletedTasks = (id) => {
    const { newArr } = removeListItem(completeItems, id);
    setCompleteItems([...newArr]);
  };

  //deletes an item from the pending tasks section
  const removeFromPendingTasks = (id) => {
    const { newArr } = removeListItem(listItems, id);
    setListItems([...newArr]);
  };

  //callback function called when edit button is clicked on an item in pending tasks section
  const handleEdit = (id, titleToEdit, priority) => {
    setInputTitle(titleToEdit);
    setEditingItemId({ id: id });
    setPrioritySelected({ value: priority, label: priority });
    setListItems((prevArr) => [...prevArr]);
  };

  return (
    <div className="App">
      <SectionContainer className="input-container">
        <SectionContainer
          className={classNames("input-container__input-section", {
            "input-container__input-section--input-height-sm":
              inputTitle.length <= 24,
            "input-container__input-section--input-height-lg": setRange(
              inputTitle,
              24,
              49
            ),
            "input-container__input-section--input-height-xl": setRange(
              inputTitle,
              49,
              74
            ),
            "input-container__input-section--input-height-xxl": setRange(
              inputTitle,
              74,
              100
            ),
            "input-container__input-section--input-height-xxxl": setRange(
              inputTitle,
              100,
              115
            ),
          })}
        >
          <PrioritySelectBox
            width="tiny"
            size="tiny"
            isClearable={false}
            isSearchable={false}
            value={prioritySelected}
            onValueChange={setPrioritySelected}
          />
          <Textarea
            size="normal"
            placeholder="Add your task !"
            onChange={(e) => {
              setInputTitle(e.target.value);
            }}
            width={100}
            value={inputTitle}
            maxLength="113"
          />
          <IconButton
            size="huge"
            version="v2"
            color="success"
            icon={<Icon name={editingItemId ? "edit" : "add"} />}
            onClick={addListItem}
          />
        </SectionContainer>
        <SectionContainer
          className={classNames("search-container__input-section", {
            "search-container__input-section--search-height-sm":
              searchValue.length <= 24,
            "search-container__input-section--search-height-lg": setRange(
              searchValue,
              24,
              49
            ),
            "search-container__input-section--search-height-xl": setRange(
              searchValue,
              49,
              74
            ),
            "search-container__input-section--search-height-xxl": setRange(
              searchValue,
              74,
              100
            ),
            "search-container__input-section--search-height-xxxl": setRange(
              searchValue,
              100,
              115
            ),
          })}
        >
          <Textarea
            size="normal"
            placeholder="Search here !"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            width={100}
            value={searchValue}
            maxLength="110"
          />
        </SectionContainer>
      </SectionContainer>
      <SectionContainer
        className={classNames("list-container", {
          "list-container--one-section-empty": emptySectionConditioner(),
          "list-container--full": !emptySectionConditioner(),
          "list-container--empty": fullEmptyContainer(),
        })}
      >
        {fullEmptyContainer() && (
          <Card
            version="v2"
            shadow="dark"
            emptyCardImageSrc={
              <Icon
                name="remarks"
                color="danger"
                size="large"
                showBGColor={true}
              />
            }
            emptyCardText="No Tasks available !"
          />
        )}
        {listItems.length !== 0 && (
          <ListSection
            title="Pending Tasks"
            isCompleteContainer={false}
            listArr={filterArrayOnSearch(listItems, searchValue)}
            editId={editingItemId ? editingItemId.id : null}
            onPendingList={true}
            onEditing={handleEdit}
            onRemoving={removeFromPendingTasks}
            onComplete={doneWithListItem}
          />
        )}
        {completeItems.length !== 0 && (
          <ListSection
            title="Completed Tasks"
            isCompleteContainer={true}
            listArr={filterArrayOnSearch(completeItems, searchValue)}
            onPendingList={false}
            onEditing={handleEdit}
            onRemoving={removeFromCompletedTasks}
            onComplete={undoCompletedItem}
          />
        )}
      </SectionContainer>
    </div>
  );
};

export default App;
