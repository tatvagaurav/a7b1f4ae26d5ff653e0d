/**
 * Auther: Gaurav Chaware
 * Date: 24-09-2020
 * Desc: Add all utility function here
 */
import _ from "loadsh";

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const setUserSession = (request, response) => {
    const expiresIn = _.get(response, "data.expiresIn", 60 * 60);
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const name = _.get(response, "data.results[0].name", null);
    const dob = _.get(response, "data.results[0].birth_year", null);
    if (request.password === dob) {
        localStorage.setItem("token", name);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", name);
        openNotificationWithIcon({
            type: "success",
            title: `Welcome ${name}!`
        });
        return true;
    }
    return false;
};