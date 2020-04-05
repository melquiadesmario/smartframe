import React, { useState } from 'react'

import firebase from '../lib/firebase'

import Layout from '../components/Layout'

const CreateAccount = () => {
    const [form, setForm] = useState({
        email: 'melquiadesmario@hotmail.com',
        password: '123456',
        passwordConfirm: '123456'
    })

    const [error, setError] = useState('')

    const handleInputChange = event => {
        const value = event.target.value
        const field = event.target.name
        setForm(oldForm => ({
            ...oldForm,
            [field]: value
        }))
        setError('')
    }

    const createAccount = () => {
        setError('')
        if(form.password.length >= 6 && form.password === form.passwordConfirm){
            firebase
                .auth()
                .createUserWithEmailAndPassword(form.email, form.password)
                .catch(function(error) {
                    setError(error.message)
            })
        }
    }

    let classError = ''
    let classIcon = ' rounded-full p-1 fill-current mr-2 '
    if(form.password === form.passwordConfirm && form.password.length >= 6){
        classError += ' text-green-700 '
        classIcon += ' bg-green-200 text-green-700 '
    }
    if(form.password !== form.passwordConfirm || form.password.length < 6){
        classError += ' text-red-700 '
        classIcon += ' bg-red-200 text-red-700 '
    }

    return(
    <Layout>
            <div classNameName="container max-w-full mx-auto md:py-24 px-6">
            <div className="max-w-sm mx-auto px-6">
                    <div className="relative flex flex-wrap">
                        <div className="w-full relative">
                            <div className="md:mt-6">
                                <div className="text-center font-semibold text-black">
                                    Lorem ipsum dolor
                                </div>
                                <div className="text-center font-base text-black">
                                    Sed ut perspiciatis unde?
                                </div>
                                <form className="mt-8" x-data="{password: '',password_confirm: ''}">
                                    <div className="mx-auto max-w-lg ">
                                        <div className="py-1">
                                            <span className="px-1 text-sm text-gray-600">Email</span>
                                            <input
                                                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                                placeholder=""
                                                type="email"
                                                name='email'
                                                value={ form.email }
                                                onChange={ handleInputChange }
                                            />
                                        </div>
                                        <div className="py-1">
                                            <span className="px-1 text-sm text-gray-600">Password</span>
                                            <input
                                                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                                placeholder=""
                                                type="password"
                                                x-model="password"
                                                name='password'
                                                value={ form.password }
                                                onChange={ handleInputChange }
                                            />
                                        </div>
                                        <div className="py-1">
                                            <span className="px-1 text-sm text-gray-600">Password Confirm</span>
                                            <input
                                                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                                placeholder=""
                                                type="password"
                                                x-model="password_confirm"
                                                name='passwordConfirm'
                                                value={ form.passwordConfirm }
                                                onChange={ handleInputChange }
                                            />
                                        </div>
                                        <div className="flex justify-start mt-3 ml-4 p-1">
                                            <ul>
                                                <li className="flex items-center py-1">
                                                    <div className={ classIcon }>
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            { form.password === form.passwordConfirm &&
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            }
                                                            { form.password !== form.passwordConfirm &&
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M6 18L18 6M6 6l12 12"
                                                                />
                                                            }
                                                        </svg>
                                                    </div>
                                                    <span
                                                        className={ classError }
                                                    >
                                                        { form.password === form.passwordConfirm && form.password.length >= 6 && 'Passwords match' }
                                                        { form.password === form.passwordConfirm && form.password.length < 6 && 'Password must be at least 6 characters long' }
                                                        { form.password !== form.passwordConfirm && 'Passwords do not match' }
                                                    </span>
                                                </li>
                                                { error &&
                                                    <li className="flex items-center py-1">
                                                        <div className={ 'rounded-full p-1 fill-current bg-red-200 text-red-700 mr-2' }>
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M6 18L18 6M6 6l12 12"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <span
                                                            className={ classError }
                                                        >
                                                            { error }
                                                        </span>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                        <div className="flex justify-start">
                                            <label className="block text-gray-500 font-bold my-4 flex items-center">
                                                <input className="leading-loose text-pink-600 top-0" type="checkbox" />
                                                <span className="ml-2 text-sm py-2 text-gray-600 text-left">Accept the
                                                    <a
                                                        className="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500"
                                                        href="#"
                                                    >
                                                        Terms and Conditions of the site
                                                    </a>
                                                    and
                                                    <a
                                                        className="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500"
                                                        href="#"
                                                    >
                                                        the information data policy.
                                                    </a>
                                                </span>
                                            </label>
                                        </div>
                                        <button
                                            className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                                            type='button'
                                            onClick={ createAccount }
                                        >
                                            Register
                                        </button>
                                    </div>
                                </form>

                                <div className="text-sm font-semibold block sm:hidden py-6 flex justify-center">
                                    <a
                                        className="text-black font-normal border-b-2 border-gray-200 hover:border-teal-500"
                                        href="#"
                                    >
                                        You're already member?
                                        <span className="text-black font-semibold">
                                            Login
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateAccount
