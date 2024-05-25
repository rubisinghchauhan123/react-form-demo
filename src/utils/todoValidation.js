export default function TodoValidation(formData) {
    const errors = {};

    if (formData.title === "") {
      errors.title  = true;
    }
    if (formData.discription === "") {
      errors.discription = true;
    }
    if (formData.tag === "") {
      errors.tag = true;
    }
    if (formData.day === "") {
      errors.day = true;
    }
  
    return errors;
  }