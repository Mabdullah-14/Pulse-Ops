import {useOutletContext} from 'react-router-dom'

export const usePermission = () =>{
    const {membership} = useOutletContext()  || {}

    const permissions =membership?.role?.permissions || membership?.permissions || []

    const hasPermission = (permission)=>{
        return permission.includes(permissions)
    }

    return {hasPermission,permissions,membership}
}