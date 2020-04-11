import React, { useState } from 'react'
import firebase from '../lib/firebase'
import { navigate, Link } from 'gatsby'

import Layout from '../components/Layout'

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        passwordConfirm: ''
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

    const signIn = () => {
        console.log('Entrou no ERROR')
        setError('')
        if(form.password.length >= 6){
            firebase
                .auth()
                .signInWithEmailAndPassword(form.email, form.password)
                .then(() => {
                    navigate('/app')
                })
                .catch(function(error) {
                    console.log('ERROR:', error)
                    setError(error.message)
            })
        }
    }

    let classError = ''
    let classIcon = ' rounded-full p-1 fill-current mr-2 '
    if(form.password.length >= 6){
        classError += ' text-green-700 '
        classIcon += ' bg-green-200 text-green-700 '
    }
    if(form.password.length < 6){
        classError += ' text-red-700 '
        classIcon += ' bg-red-200 text-red-700 '
    }

    return(
    <Layout>
        <div className="container max-w-full mx-auto md:py-5 px-6">
            <div className="max-w-sm mx-auto px-6">
                    <div className="relative flex flex-wrap">
                        <div className="w-full relative">
                            <div className="md:mt-0">
                                <div className="text-center font-semibold text-black">
                                    Sign-in
                                </div>
                                <div className="text-center font-base text-black">
                                    You can start using SmarFrame.
                                </div>
                                <form className="mt-2" x-data="{password: '',password_confirm: ''}">
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
                                                            { form.password.length >= 6 &&
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            }
                                                            { form.password.length < 6 &&
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
                                                        { form.password.length >= 6 && 'Password length is right.' }
                                                        { form.password.length < 6 && 'Password must be at least 6 characters long' }
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
                                        <button
                                            className="mt-1 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                                            type='button'
                                            onClick={ signIn }
                                        >
                                            Sign-in
                                        </button>
                                    </div>
                                </form>

                                <div className="text-sm font-semibold block py-4 flex justify-center">
                                    <Link
                                        className="text-black font-normal border-b-2 border-gray-200 hover:border-teal-500"
                                        to='/create-account'
                                    >
                                        Don't have an account?
                                        <span className="text-black font-semibold ml-2">
                                            Create one here.
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SignIn

