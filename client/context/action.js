export const fetchStart = (credentialsStart)=>{
    return({type:"LOGIN_START"})
}
export const fetchSuccess = (user)=>{
    return({type:"LOGIN_SUCCESS", payload:user})
}
export const fetchFailure = ()=>{
    return({type:"LOGIN_FAILURE"})
}
export const updateStart = (credentialsStart)=>{
    return({type:"UPDATE_START"})
}
export const updateSuccess = (user)=>{
    return({type:"UPDATE_SUCCESS", payload:user})
}
export const updateFailure = ()=>{
    return({type:"UPDATE_FAILURE"})
}

export const logout = ()=>{
    return ({type:"LOGOUT"})
}