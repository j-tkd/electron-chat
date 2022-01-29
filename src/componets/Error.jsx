import React from "react";

export const Error = ({ errors }) => {
  console.log(errors);
  if (!errors || !errors.length) {
    return null;
  }

  return (
    <div>
      {errors.map((e) => (
        <div key={e}>{e}</div>
      ))}
    </div>
  );
};
