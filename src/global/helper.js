
import { createPostRequest, createPutRequest } from "./requests";
import {store} from '../redux/store';
import { setErrorModal } from '../redux/modalSlice';
import toast  from 'react-hot-toast';


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

export const changeHandler = (setFormData, setErrors, errors,formData, field, value, setError) =>
{
  const handleChange = (
    field,
    value,
    setError = false,
    data = { ...formData }
  ) => {
    const setField = (obj, keys, val) => {
      if (keys.length === 1) obj[keys[0]] = val;
      else {
        const [head, ...rest] = keys;
        if (!obj[head]) obj[head] = isNaN(parseInt(rest[0])) ? {} : [];
        obj[head] = setField(obj[head], rest, val);
      }
      return obj;
    };

    const fieldParts = field.split(".");
    data = setField(data, fieldParts, value);
    setFormData(data);
    if (typeof setError === "function" && value === "")
      setErrors(setField({ ...errors }, fieldParts, ""));
    else if (typeof setError == "function")
      setErrors(setField({ ...errors }, fieldParts, setError(value)));
  };

  handleChange(field, value, setError);
  
}




export const saveHandler = (nextStep,fields, postEndPoint, putEndpoint, message,entity, errors, formData, setErrors, handleChange, setReload, reload, closeForm) =>
{
  const handleSave = async (nextStep = null) => {
    let required = false;
    let errorFields = { ...errors };
    for (const field of fields) {
      if (
        (!required && formData[field] === undefined) ||
        formData[field] === ""
      ) {
        errorFields = { ...errorFields, [field]: "This field is required" };
        required = true;
      }
    }
    if (required) {
      setErrors(errorFields);
      return;
    }
    const copyFormData = { ...formData };
    copyFormData.profileImg = /\/([^/?]+)\?/.test(formData.profileImg)
      ? formData.profileImg.match(/\/([^/?]+)\?/)[1]
      : formData.profileImg;
    if (copyFormData._id === undefined) {
      const response = await createPostRequest(copyFormData,postEndPoint);
      if (response.status === 201) {
        handleChange("_id", response[entity]._id);
        setReload(!reload);
        toast.success(message);
      } else {
        store.dispatch(setErrorModal({message: response.error || response.message}));
        return;
      }
    } else {
      const response = await createPutRequest(
        copyFormData,
        putEndpoint
      );
      toast.success(message);
      setReload(!reload);
    }
    if (typeof nextStep != "function") closeForm("anything");
    else nextStep();
  };

  handleSave(nextStep);
}