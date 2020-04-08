import React from "react";

const CharsDisplay = (props) => {
  console.log(props, "props on charsdisplay");
  return (
    <div className="inner-cont">
      {props.data.map((val) => {
        return <h1 key={val.id}>{val.title}</h1>;
      })}
    </div>
  );
};

export default CharsDisplay;
