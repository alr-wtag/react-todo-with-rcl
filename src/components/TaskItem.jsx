import { useState, useEffect } from "react";
import { Task, EmphasisTag } from "@wtag/react-comp-lib";

const colors = { High: "danger", Medium: "warning", Low: "neutral" };

//wrapper component to make use of the RCL component Task
const TaskItem = (props) => {
  const {
    id,
    name,
    priority,
    onPendingList,
    dateCreated,
    dateUpdated,
    onEditing,
    onComplete,
    onRemoving, 
  } = props;

  const [toggleReRender, setToggleReRender] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    const reRenderFunc = setInterval(
      () => setToggleReRender((prev) => !prev),
      60000
    );
    return () => clearInterval(reRenderFunc);
  }, []);

  return (
    <Task
      id={id}
      priority={
        <EmphasisTag
          className={
            colors[priority] === "neutral" ? "" : "emphasis-tag--white-font"
          }
          type={colors[priority]}
          text={priority}
        />
      }
      name={name.length > 14 ? `${name.slice(0, 13)}...` : name}
      description={name}
      isChecked={onPendingList ? false : true}
      isExpanded={isExpanded}
      assignDate={dateCreated}
      createdTime={dateCreated}
      lastUpdatedTime={dateUpdated}
      onExpand={toggleExpand}
      onCheck={() => onComplete(id)}
      onEdit={() => onEditing(id, name, priority)}
      onDelete={() => onRemoving(id)}
    />
  );
};

export default TaskItem;
