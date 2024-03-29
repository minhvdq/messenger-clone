'use client'

import axios from 'axios'
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from "@/app/components/input/Input";
import Button from "@/app/components/Button"
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = 'LOGIN' | 'REGISTER'
const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if(variant === 'LOGIN'){
      setVariant('REGISTER')
    }
    else{
      setVariant('LOGIN')
    }
  },[variant])

  const {
    register,
    handleSubmit,
    formState:{
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
        name: '',
        email: '',
        password: ''
    },
  })

  const onSubmit : SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if( variant === "REGISTER"){
      //Axios register
      console.log( data.email )
      axios.post('/api/register', data )  

    }
    if( variant === "LOGIN" ){
      //Axios Login
    }
  }
  
  const socialAction = (action:string) => {
    setIsLoading(true )
    //NextAuth Social sign in
  }

  return(
    <div
      className="
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md"
    >
      {/* This contains all the login function */}
      <div
        className="
          bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
          "
      >
        {/* the Form of registering and logging*/}
        <form
         className="space-y-6"
         onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            //If user want to register, they must provide name too
            <Input disabled={isLoading} id="name" label="Name" register={register} errors = {errors} />
          )}
          <Input 
            id="email" 
            label="Email address" 
            type="email"
            register={register} 
            errors = {errors}
            disabled={isLoading}
          />

          <Input 
            id="password" 
            label="Password"
            type="password" 
            register={register} 
            errors = {errors}
            disabled={isLoading}
          />

          <div>
            <Button
              disabled={isLoading}
              fullWidth
              type='submit'
            > {variant === 'LOGIN' ? 'Sign in': 'Register'}</Button>
          </div>
         </form>

        <div className="mt-6">
          <div className="relative">
            <div 
              className="
                absolute
                inset-0
                flex
                items-center"
            >
              <div className="w-full border-t border-gray-300">

              </div>
            </div>
            <div 
              className="
                relative 
                flex 
                justify-center 
                text-sm
            ">
              <span className="bg-white px-2 text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton onClick={() => socialAction('github')} icon={BsGithub} />
            <AuthSocialButton onClick={() => socialAction('google')} icon={BsGoogle} />
          </div>
        </div>

        <div
          className="
            flex
            gap-2
            justify-center
            text-sm
            mt-6
            px-2
            text-gray-500"
        >
          <div>
            {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?' }
          </div>
          <div 
            onClick={toggleVariant}
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Log in'}
          </div>

        </div>
      </div>
    </div>  
  );
}

export default AuthForm