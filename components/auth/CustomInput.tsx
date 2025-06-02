import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Control, Form } from 'react-hook-form'
import { z } from 'zod'

// For both login and sign up forms, we can use a single schema
export const formSchema = z.object({
   // Fields for sign up only
   firstName: z.string().optional(),
   lastName: z.string().optional(),
   address: z.string().optional(),
   state: z.string().optional(),
   postalCode: z.string().optional(),
   dob: z.string().optional(),
   ssn: z.string().optional(),

   // Fields for both login and sign up
   email: z.string().email("Invalid email address"),
   password: z.string().min(6, "Password must at least 6 characters").max(25, "Password must be at most 25 characters"),
})

interface CustomInput {
   control: Control<z.infer<typeof formSchema>>,
   name: "firstName" | "lastName" | "address" | "state" | "postalCode" | "dob" | "ssn" | "email" | "password",
   label: string,
   placeholder?: string,
}

const CustomInput = ({control, name, label, placeholder }: CustomInput
) => {
   return (
      <FormField
         control={control}
         name={name}
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
