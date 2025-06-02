import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Control, FieldPath, Form } from 'react-hook-form'
import { z } from 'zod'

// For both login and sign up forms, we can use a single schema
export const authFormSchema = (type: string) => z.object({
   // Fields for sign up only
   firstName: type === 'sign-in' ? z.string().optional(): z.string().min(3),
   lastName: type === 'sign-in' ? z.string().optional(): z.string().min(3),
   address: type === 'sign-in' ? z.string().optional(): z.string().max(50),
   state: type === 'sign-in' ? z.string().optional(): z.string().min(2).max(2),
   postalCode: type === 'sign-in' ? z.string().optional(): z.string().min(3).max(6),
   dob: type === 'sign-in' ? z.string().optional(): z.string().min(3),
   ssn: type === 'sign-in' ? z.string().optional(): z.string().min(3),

   // Fields for both login and sign up
   email: z.string().email("Invalid email address"),
   password: z.string().min(6, "Password must at least 6 characters").max(25, "Password must be at most 25 characters"),
})

const formSchema = authFormSchema('sign-up')

interface CustomInput {
   control: Control<z.infer<typeof formSchema>>,
   name: FieldPath<z.infer<typeof formSchema>>,
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
                  <Input
                     placeholder={placeholder}
                     className="input-class"
                     type={name === "password" ? "password" : "text"}
                     {...field}
                  />
               </FormControl>
               <FormMessage className="form-message" />
            </FormItem>
         )}
      />

   )
}

export default CustomInput
