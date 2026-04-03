import * as yup from "yup";

const userProfileValidateSchema = yup.object().shape({
    userName: yup
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name too long")
        .required("Full name is required"),

    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),

    phone: yup
        .string()
        .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian phone number")
        .required("Phone number is required"),

    houseNo: yup
        .string()
        .required("House number is required"),

    street: yup
        .string()
        .min(4, "Street required")
        .required("Street is required"),

    city: yup
        .string()
        .required("City is required"),

    state: yup
        .string()
        .required("State is required"),

    pincode: yup
        .string()
        .matches(/^[1-9][0-9]{5}$/, "Enter valid 6-digit pincode")
        .required("Pincode is required"),
});



export default userProfileValidateSchema;