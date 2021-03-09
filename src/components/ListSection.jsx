import classNames from "classnames";
import TaskItem from "./TaskItem";

function ListSection(props) {
  const {
    listArr,
    editId,
    onPendingList,
    isCompleteContainer,
    onEditing,
    onRemoving,
    onComplete,
  } = props;

  //checks whether to trigger className 'list-section--none' when it is completely empty inside
  const getCustomClassName = (arr) => {
    return `list-section${arr.length === 0 ? "--none" : ""}`;
  };

  let refinedArr = listArr.slice();

  //removes the item from the list that is under edit temporarily
  //valid for pending tasks section only
  if (editId)
    refinedArr = refinedArr.filter((curr) => curr.uniqueId !== editId);

  return (
    <div
      className={classNames(getCustomClassName(refinedArr), {
        "complete-container": isCompleteContainer,
      })}
    >
      <div className="list-section__title">{props.title}</div>
      {refinedArr.map((curr, idx) => {
        return (
          <TaskItem
            key={idx}
            id={curr.uniqueId}
            name={curr.title}
            priority={curr.priority}
            dateCreated={curr.dateCreated}
            dateUpdated={curr.dateUpdated}
            onPendingList={onPendingList}
            createdTime={curr.date}
            onEditing={onEditing}
            onRemoving={onRemoving}
            onComplete={onComplete}
          />
        );
      })}
    </div>
  );
}

export default ListSection;
