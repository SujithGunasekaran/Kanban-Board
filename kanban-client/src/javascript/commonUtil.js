export function validateForm(formKeyList, formData, reactiveSetter) {
    let isValidForm = true;
    formKeyList.forEach(key => {
        if (!formData[key] || formData[key] === '') {
            reactiveSetter[`${key}_Error`] = `Please enter ${key}`;
            isValidForm = false;
        }
    })
    return isValidForm;
}
