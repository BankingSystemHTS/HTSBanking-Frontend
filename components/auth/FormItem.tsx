import React from 'react'
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const FormItem = ({ field, control, name, label, placeholder }
   : {
      field: any, control?: any, name: string,
      label: string, placeholder?: string
   }
) => {
   return (
      <FormItem>
         <FormLabel>{label}</FormLabel>
         <FormControl>
            <Input placeholder={placeholder} {...field} />
         </FormControl>
         <FormMessage className="form-message" />
      </FormItem>
   )
}

export default FormItem