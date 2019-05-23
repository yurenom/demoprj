import { actionTypes } from '../actions'

const InitialState = {
    users: []
}

const addAditionalData = (data) => {
    const userAtt = [
        { key: 1, value: "roleValue" },
        { key: 2, value: "middleName" },
        { key: 3, value: "lastName" },
        { key: 4, value: "gender" },
        { key: 5, value: "month" },
        { key: 6, value: "day" },
        { key: 7, value: "year" },
        { key: 8, value: "email" },
        { key: 9, value: "mobile" },
        { key: 10, value: "facebook" },
        { key: 11, value: "twitter" },
        { key: 12, value: "about" },
        { key: 13, value: "avatarImg" }
    ];
    const roles = [
        { key: "sd", value: "Software Developer" },
        { key: "bd", value: "Breakfix Developer" },
        { key: "ac", value: "Automation Coordinator" },
        { key: "sa", value: "Software Architect" },
        { key: "nd", value: "Ninja Developer" },
        { key: "cm", value: "Coffee Maker" }
    ];
    const abouts = [
        { key: 1, value: "is cool. Lives in New York and loves pets." },
        { key: 2, value: "is a little clueless. Lives in Guadalajara and is planning to travel around the world." },
        { key: 3, value: "is very outgoing. Lives in Monte Carlo and collects cups from different places." },
        { key: 4, value: "is good looking and a little bit weird. Has too many friends and likes to go to the movies and eat hot dogs. Lives in Buenos Aires with a kitten named Romina." },
        { key: 5, value: "is confident and loyal. Lives in Saltillo and in the nights performs in a rock band." },
        { key: 6, value: "is so geek and funny. Lives in Toronto and loves video games, marvel movies and kpop." }
    ];
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let name = element.name.substring(0, (element.name.indexOf(' ')));
        let lastname = element.name.substring((element.name.indexOf(' ') + 1), element.name.length);
        element.name = name;
        for (let i = 0; i < userAtt.length; i++) {
            const att = userAtt[i].value;
            element[att] = "";
            if (element.id === 4) {
                if (att === "gender")
                    element[att] = "female";
            }
            else {
                if (att === "gender")
                    element[att] = "male";
            }
            if (att === "avatarImg")
                element[att] = element.img;
            if (att === "lastName")
                element[att] = lastname;
            if (att === "email")
                element[att] = element.name.toLowerCase() + "@mymail.com";
            if (att === "roleValue") {
                for (let r = 0; r < roles.length; r++) {
                    const role = roles[r];
                    if (element.role === role.value) {
                        element[att] = role.key;
                    }
                }
            }
            if (att === "month") {
                element[att] = index + 1;
            }
            if (att === "day") {
                element[att] = index + 1;
            }
            if (att === "year") {
                element[att] = 2019 - element.age;
            }
            if (att === "about") {
                element[att] = abouts[index].value;
            }
            if (att === "mobile") {
                if ((index % 2) === 0)
                    element[att] = "8828" + element.year + element.month + index + element.day;
            }
        }
    }
    return data;
}

export const mainReducer = (state = InitialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USERS:
            let userData = addAditionalData(action.payload.data.data);
            return {
                ...state, users: userData
            }
        case actionTypes.POST_USERS: {
            let newId = Math.max.apply(Math, state.users.map(function (i) { return i.id; })) + 1;
            action.infoUser["id"] = newId;
            let newData = state.users.slice();
            // newData.push(action.payload.data.data);
            newData.push(action.infoUser);
            return {
                ...state, users: newData
            }
        }
        case actionTypes.DELETE_USER: {
            return {
                ...state, users: state.users.filter(us => {
                    return parseInt(us.id) !== parseInt(action.payload)
                })
            }
        }
        case actionTypes.UPDATE_USER:
            return {
                ...state, users: state.users.map((value) => {
                    if (value.id === action.payload.id)
                        return action.payload;

                    return value;
                })
            }
        default:
            break
    }
    return state
}

export default mainReducer