import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const CustomInput = ({ form, control, name, label, placeholder }
) => {
   return (
      <FormField
         control={control}
         name="password"
         render={({ field }) => (
            <FormItem>
               <FormLabel>{label}</FormLabel>
               <FormControl>
                  <Input placeholder={placeholder} {...field} />
               </FormControl>
               <FormMessage className="form-message" />
            </FormItem>
         )}
      />

   )
}

export default CustomInput
