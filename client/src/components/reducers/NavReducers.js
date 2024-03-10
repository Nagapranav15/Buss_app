const initState = "Login"
export default function NavReducers(state=initState,action)
{
    switch(action.type){
        case "Login":
            return "Login";
        case "Registration":
            return "Registration";
        case "Buslist":
            return "Buslist";
        case "Mybookings":
            return "Mybookings";
        case "Aboutus":
            return "Aboutus";
        default:
            return "";
    }
}