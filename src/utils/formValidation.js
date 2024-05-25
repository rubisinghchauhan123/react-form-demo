export default function FormValidation(formData) {
    const errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (formData.firstName === "") {
      errors.firstName = true;
    }
    if (formData.lastName === "") {
      errors.lastName = true;
    }
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
    if (formData.email === "") {
      errors.email = true;
    } else if (!email_pattern.test(formData.email)) {
      errors.email = "Email doesn't match the pattern!";
    }
    if (formData.password === "") {
      errors.password = true;
    } else if (!password_pattern.test(formData.password)) {
      errors.password = "Password doesn't match the pattern!";
    }
  
    return errors;
  }