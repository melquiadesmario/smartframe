import React, { useState } from 'react'
import firebase from '../../../lib/firebase'

import { useAuth } from '../../../lib/AuthContext'

const UpdatePassword = () => {
    const auth = useAuth()

    const [form, setForm] = useState({
        currentPassword: '',
        password: '',
        passwordConfirm: ''
    })

    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleInputChange = event => {
        const value = event.target.value
        const field = event.target.name
        setForm(oldForm => ({
            ...oldForm,
            [field]: value
        }))
        setError('')
    }

    const createAccount = async () => {
        setError('')
        if(form.password.length >= 6 && form.password === form.passwordConfirm){
            try{
                const user = firebase.auth().currentUser
                const newPassword = form.password
                const credential = firebase.auth.EmailAuthProvider.credential(
                    auth.email,
                    form.currentPassword
                )

                await user.reauthenticateWithCredential(credential)
                await user.updatePassword(newPassword)

                setSuccess(true)
            }catch(error){
                setError(error.message)
            }
            
            // firebase
            //     .auth()
            //     .createUserWithEmailAndPassword(form.currentPassword, form.password)
            //     .then(() => {
            //         navigate('/app')
            //     })
            //     .catch(function(error) {
            //         setError(error.message)
            // })
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
        <div className="container max-w-full mx-auto md:py-5 px-6">
            <div className="max-w-sm mx-auto px-6">
                <div className="relative flex flex-wrap">
                    <div className="w-full relative">
                        <div className="md:mt-0">
                            { success && 
                                <div className='container mx-auto mt-5 bg-green-100 border-l-4 border-green-500 text-green-700 p-4' role='alert'>
                                    <p className='font-bold'>Password Changed</p>
                                    <p>Your password has been successfylly modified.</p>
                                </div>
                            }
                            { !success &&
                                <>
                                    <div className="text-center font-semibold text-black">
                                        Change Password
                                    </div>
                                    <form className="mt-2" x-data="{password: '',password_confirm: ''}">
                                        <div className="mx-auto max-w-lg ">
                                            <div className="py-1">
                                                <span className="px-1 text-sm text-gray-600">Current Password</span>
                                                <input
                                                    className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                                    placeholder=""
                                                    type="password"
                                                    name='currentPassword'
                                                    value={ form.currentPassword }
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
                                            <button
                                                className="mt-1 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                                                type='button'
                                                onClick={ createAccount }
                                            >
                                                Change
                                            </button>
                                        </div>
                                    </form>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdatePassword
