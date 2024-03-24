export const handleCheckChange = (optionLabel, selectedCheck, setSelectedCheck) => {
    let selectedCheckCopy = [...selectedCheck];
    if (!selectedCheckCopy.includes(optionLabel))
      selectedCheckCopy.push(optionLabel);
    else
      selectedCheckCopy = selectedCheckCopy.filter(
        (check) => check !== optionLabel
      );
    setSelectedCheck(selectedCheckCopy);
};