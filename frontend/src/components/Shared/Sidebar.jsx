import React from "react";
import useRoleArray from "../hooks/useRoleArray";

const Sidebar = ({ role }) => {
  const selectedRoleArray = useRoleArray(role);

  return (
    <div>
      <h3>Sidebar</h3>
      <ul>
        {selectedRoleArray.map((item, index) => (
          <li key={index}>
            <a href={item.to}>{item.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
