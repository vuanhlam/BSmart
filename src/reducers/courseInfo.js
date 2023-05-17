export const INITIALSTATE = {
    name: '',
    level: '',
    price: '',
    image: '',
    major: '',
    learnType: '',
    linkMeet: '',
    minStudent: '',
    maxStudent: '',
    tags: '',
    courseDesc: ''
}

export const courseInfoReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state, [action.payload.name]: action.payload.value
            }
        case 'CHANGE_INPUT_PRICE':
            return {
                ...state, [action.payload.name]: action.payload.value
            }
        case 'CHANGE_FILE':
            return {
                ...state, [action.payload.name]: action.payload.value
            }
        case 'CREATE_TAG': 
            return {
                ...state, [action.payload.name]: action.payload.value
            }
        default:
            return state;
    }
}