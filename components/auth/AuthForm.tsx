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
import CustomInput, { authFormSchema } from './CustomInput'
import { Loader } from 'lucide-react'
import { signUp, signIn } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
import PlaidLink from './PlaidLink'



const AuthForm = ({ type }: { type: string }) => {
   const [user, setUser] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();

   const formSchema = authFormSchema(type);

   // Initialize form with react-hook-form
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
   })

   //On submit handler
   const onSubmit = async (data: z.infer<typeof formSchema>) =>{
      // values will be type safe and validated here
      setIsLoading(true);
      try {
         //Sign up with Appwrite & create plaid token
         if (type === 'sign-up') {
            const newUser = await signUp(data);
            setUser(newUser);
            router.push("/")
         }
         if (type === 'sign-in') {
            // await fetch("/api/sign-in", {
            //    method: 'POST',
            //    headers: {
            //       'Content-Type': 'application/json'
            //    },
            //    body: JSON.stringify({
            //       email: data.email,
            //       password: data.password
            //    })
            // })
            const response = await signIn({
               email: data.email,
               password: data.password,
            })

            if (response) router.push('/')
         }
      } catch (error) {
         console.error("Error during authentication:", error);
      } finally {
         setIsLoading(false);
      }
      
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

         {/* {user ? ( */}
            <div className="flex flex-col  gap-4">
               <PlaidLink user={user}  variant='primary' />
            </div>
         {/* ) : */}
            <>
               {/* shadcn form */}
               <Form {...form}>
                  {/* if form type is sign up, render additional fields */}
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                     {type == 'sign-up' && (
                        <>
                           <div className="flex justify-between">
                              <CustomInput
                                 control={form.control}
                                 name="firstName"
                                 label="First Name"
                                 placeholder="ex: Joe"
                              />
                              <CustomInput
                                 control={form.control}
                                 name="lastName"
                                 label="Last Name"
                                 placeholder="ex: Doe"
                              />
                           </div>
                              <CustomInput
                                 control={form.control}
                                 name="address"
                                 label="Address"
                                 placeholder="Enter your address"
                           />
                           <CustomInput
                              control={form.control}
                              name="city"
                              label="City"
                              placeholder="Enter your city"
                           />
                           <div className="grid grid-cols-2 gap-5">
                              <CustomInput
                                 control={form.control}
                                 name="state"
                                 label="State"
                                 placeholder="ex: CA"
                              />
                              <CustomInput
                                 control={form.control}
                                 name="postalCode"
                                 label="Postal Code"
                                 placeholder="ex: 11011"
                              />
                              <CustomInput
                                 control={form.control}
                                 name="dob"
                                 label="Date of Birth"
                                 placeholder="yyy-mmm-dd"
                              />
                              <CustomInput
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
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                     />
                     <CustomInput
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                     />
                     <div className="flex justify-center">
                        <Button
                           variant="outline"
                           type="submit"
                           className="w-full bg-blue-500 text-white font-semibold 
                           hover:bg-sky-700"
                           disabled={isLoading}
                        >
                           {isLoading ? (
                              <div className="flex gap-2">
                                 <Loader size="20" />
                                 Loading...
                              </div>
                           ) : (
                              <div>Submit</div>
                           )}
                        </Button>
                     </div>
                  </form>
               </Form>

               <footer className="flex justify-center gap-2">
                  <p>{type == 'sign-up' ? "Don't have an account?": "Already have an account?"}</p>
                  {type === 'sign-up' ? (
                     <Link
                        href="/sign-in"
                        className="text-blue-500"
                     >
                        Login
                     </Link>
                  ) : (
                        <Link href="/sign-up" className="text-blue-500">
                           Sign Up
                        </Link>
                  )}
               </footer>
            </>
         {/* } */}

      </section>
   )
}

export default AuthForm
