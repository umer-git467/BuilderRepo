import { useState, useEffect } from "react";

const useRoleArray = (role) => {
  const builderOptions = [
    {
      text: "Builder Option 1",
      to: "/builder-option-1",
    },
    {
      text: "Builder Option 2",
      to: "/builder-option-2",
    },
  ];

  const clientOptions = [
    {
      text: "Client Option 1",
      to: "/client-option-1",
    },
    {
      text: "Client Option 2",
      to: "/client-option-2",
    },
  ];

  const [selectedRoleArray, setSelectedRoleArray] = useState([]);
  useEffect(() => {
    if (role === "Client") {
      setSelectedRoleArray(clientOptions);
    } else {
      setSelectedRoleArray(builderOptions);
    }
  }, [role]);

  return selectedRoleArray;
};

export default useRoleArray;
