export const saveDataToJson = (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "profile_data.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
