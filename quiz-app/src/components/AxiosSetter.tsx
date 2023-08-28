import { ReactElement, useEffect } from "react";
import {setAxiosDefault} from '../axiosDefault'
export default function AxiosSetter({children}:{children:ReactElement}){
    useEffect(() => {
        setAxiosDefault();
    },[])
    return(
        children
    )
}