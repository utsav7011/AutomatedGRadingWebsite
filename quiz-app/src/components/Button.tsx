import { Link } from "react-router-dom";


export default function Button({text, route}:{text:string, route: string}){
    return (
        
        <div className="grid place-self-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2 text-lg">
                <Link to={route}>
                {text}
            </Link>
        </div>
    )
}