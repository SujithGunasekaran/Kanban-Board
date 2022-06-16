import { reactive } from 'vue';

function useUserform() {

    let userDetail = reactive({
        formData: {}
    });

    function handleInputChange(event, formError) {
        const { name, value } = event.target;
        if (formError[`${name}_Error`]) {
            delete formError[`${name}_Error`];
        }
        userDetail.formData[name] = value;
    }

    function resetForm() {
        userDetail.formData = {};
    }

    return {
        userDetail,
        handleInputChange,
        resetForm
    }

}

export default useUserform;
