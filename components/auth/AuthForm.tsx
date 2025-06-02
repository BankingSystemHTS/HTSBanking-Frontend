'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'

// For both login and sign up forms, we can use a single schema
const formSchema = z.object({
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

const AuthForm = ({ type }: { type: string }) => {
   const [user, setUser] = useState(null);

   // Initialize form with react-hook-form
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
   })

   //On submit handler
   function onSubmit(values: z.infer<typeof formSchema>) {
      // values will be type safe and validated here
      console.log(values)
   }
   return (
      <section className="auth-form">
         <header className="flex flex-col gap-5 md:gap-8">
            <Link
               href="/"
               className="flex items-center cursor-pointer
              gap-2"
            >
               <Image
                  src="icons/logo.svg"
                  width={34}
                  height={34}
                  alt="logo"
                  className="size-[24px] max-xl:size-14"
               />
               <h1 className="sidebar-logo">
                  HTSBanking
               </h1>
            </Link>
            <div className="flex flex-col gap-1 md:gap-3">
               <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                  {user ? 'Link Account' : type === 'sign-in' ? 'Log In' : 'Sign Up'}
               </h1>
               <p className="text-16 font-normal text-gray-600">
                  {user
                     ? 'Link your account to continue'
                     : "Welcome back! Please enter your details"
                  }
               </p>
            </div>
         </header>

         {user ? (
            <div className="flex flex-col  gap-4">
               {/* Plaid Link */}
            </div>
         ) :
            <>
               {/* shadcn form */}
               <Form {...form}>
                  {/* if form type is sign up, render additional fields */}
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                     {type == 'sign-up' && (
                        <>
                           <div className="flex justify-between">
                              <CustomInput
                                 form={form}
                                 control={form.control}
                                 name="firstName"
                                 label="First Name"
                                 placeholder="ex: Joe"
                              />
                              <CustomInput
                                 form={form}
                                 control={form.control}
                                 name="lastName"
                                 label="Last Name"
                                 placeholder="ex: Doe"
                              />
                           </div>
                              <CustomInput
                                 form={form}
                                 control={form.control}
                                 name="address"
                                 label="Address"
                                 placeholder="Enter your address"
                              />
                           <div className="grid grid-cols-2 gap-5">
                              <CustomInput
                                 form={form}
                                 control={form.control}
                                 name="state"
                                 label="State"
                                 placeholder="ex: CA"
                              />
                              <CustomInput
                                 form={form}
                                 control={form.control}
                                 name="postalCode"
                                 label="Postal Code"
                                 placeholder="ex: 11011"
                              />
                              <CustomInput
                                 form={form}
                                 control={form.control}
                                 name="dob"
                                 label="Date of Birth"
                                 placeholder="yyy-mmm-dd"
                              />
                              <CustomInput
                                 form={form}
                                 control={form.control}
                                 name="ssn"
                                 label="SSN"
                                 placeholder="ex: 1234"
                              />
                           </div>
                        </>
                     )}
                     {/* Common fields for both login and sign up */}
                     <CustomInput
                        form={form}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                     />
                     <CustomInput
                        form={form}
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                     />
                     <div className="flex justify-center">
                        <Button variant="outline" type="submit" className="w-full bg-blue-500 text-white font-semibold hover:bg-sky-700">
                           Submit
                        </Button>
                     </div>
                  </form>
               </Form>
            </>
         }

      </section>
   )
}

export default AuthForm
