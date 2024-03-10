export default function AuthReducer(state=[null,0], action)
{
    switch(action.type)
    {
        case "login":
            localStorage.setItem("un",action.data.un)
            return [action.data.un]
        case "logout":
            localStorage.removeItem("un")
            return [null,0]
        default:
            return [null,0]
    }
}