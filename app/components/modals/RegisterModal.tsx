'use client';
import React from 'react'
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {FieldValues, SubmitHandler, useForm, useFormContext} from 'react-hook-form';
import useRegisterModal from '../hooks/useRegisterModal';
import Modal from './modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { Island_Moments } from 'next/font/google';


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const{
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name: '',
            email: '',
            password: '',
        }
    });
    const onSubmit: SubmitHandler<FieldValues>= (data)=>{
        setIsLoading(true);
        axios.post('/api/register', data)
        .then(()=>{
            registerModal.onClose();

        })
        .catch((errors)=>{
            console.log(errors);
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }
 
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
            title='Welcome to Airbnb'
            subtitle='Create an Account'
            />
            <Input
            id ='email'
            label='Email'
            disabled = {isLoading}
            register={register}
            errors={errors}
            required
            />
        </div>

    )


  return (
    <Modal
    disabled = {isLoading}
    isOpen = {registerModal.isOpen}
    title='Register'
    actionLabel='Continue'
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    />
    
  )
}

export default RegisterModal