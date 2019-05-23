import { actionTypes } from './actionTypes'
import API from '../Api'

export function getUsers() {
    return dispatch => {
        API.get('/users')
            .then(response => {
                dispatch({
                    type: actionTypes.GET_USERS,
                    payload: response
                })
            })
    }
}

export function postUsers(infoUser) {
    return dispatch => {
        API.post('/users', infoUser)
            .then(response => {
                dispatch({
                    type: actionTypes.POST_USERS,
                    payload: response,
                    infoUser: infoUser
                })
            })
            .catch((error) => {
                console.error('error', error)
            })
    }
}

export function deleteUser(idUser) {
    return dispatch => {
        API.delete('/users', idUser)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.DELETE_USER,
                        payload: idUser
                    })
                }
                else
                    console.error('error: ', response);
            })
            .catch((error) => {
                console.error('error: ', error)
            })
    }
}

export function updateUser(user) {
    return dispatch => {
        API.put('/users', user)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.UPDATE_USER,
                        payload: user
                    })
                }
                else
                    console.error('error: ', response);
            })
            .catch((error) => {
                console.error('error: ', error)
            })
    }
}