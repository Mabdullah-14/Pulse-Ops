import React, { useState } from 'react'
import Button from '../../components/common/Button'
import InputField from '../../components/common/InputField'
import { useCreateRole } from '../../hooks/mutations/roles/useCreateRole'
import { usePermission } from '../../hooks/usePermission'
import { PERMISSIONS } from '../../constants/Permisson'
import { roleNameSchema } from '../../validators/RoleValidators'
const CreateRoleModal = ({isOpen,isClose,orgSlug}) => {
   const [name,setname]=useState('')
   const [selectedPermission,setSelectedPermissions]=useState('')
   const [errors,setErrors] = useState({})

   const {mutate,isPending}=useCreateRole()

    const { hasPermission } = usePermission()
    const canCreateRole = hasPermission(PERMISSIONS.ROLE_CREATE)

    if(!isOpen){
        return null
    }
    return (
        <div>

        </div>
    )
}

export default CreateRoleModal
