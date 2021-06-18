export default (state,action)=>{
    switch(action.type){
        case "AUTHORIZE_USER":
            return{
                ...state,
                

            }
        default:
            return state;
    }

}