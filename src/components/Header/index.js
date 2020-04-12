import React from 'react'
import { Link, navigate } from 'gatsby'

import './styles.css'

import { useAuth } from '../../lib/AuthContext'

const MyAccount = ({ signOut }) => {
    return(
        <div className='dropdown inline-block relative'>
            <button className='bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center'>
                <span>My Account</span>
            </button>
            <ul className='dropdown-content absolute hidden text-gray-700 pt-1'>
                <li>
                    <Link
                        className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
                        to='/app'
                    >
                        Panel Home
                    </Link>
                </li>
                <li>
                    <Link
                        className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
                        to='/app/update-password'
                    >
                        Update Password
                    </Link>
                </li>
                <li>
                    <button
                        className='rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
                        onClick={ signOut }
                    >
                        Sign Out
                    </button>
                </li>
            </ul>
        </div>
    )
}

const Header = ({ app }) => {
    const auth = useAuth()
    const signOut = async () => {
        await auth.signOut()
        navigate('/')
    }

    return(
        <div className='bg-gray-200 px-4 py-4'>
            <div className='w-full md:max-w-6xl md:mx-auto md:flex md:items-center md:justify-between'>
                <div>
                    <Link
                        className='inline-block py-2 text-gray-800 text-2xl font-bold'
                        to='/'
                    >
                        Smart Frame
                    </Link>
                </div>
                <div>
                    <div className='hidden md:block'>
                        <Link
                            className='inline-block py-1 md:py-4 text-gray-600 mr-6 font-bold'
                            to='/d'
                        >
                            How it Works
                        </Link>
                        <Link
                            className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6'
                            to='/'
                        >
                            Solutions
                        </Link>
                        <Link
                            className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6'
                            to='/'
                        >
                            Pricing
                        </Link>
                        <Link
                            className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6'
                            to='/'
                        >
                            Desktop
                        </Link>
                    </div>
                </div>
                <div className='md:block'>
                    { !auth.isAuth &&
                        <>
                            <Link
                                className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6'
                                to='/sign-in'
                            >
                                Login
                            </Link>
                            <Link
                                className='inline-block py-2 px-4 text-gray-700 bg-white hover:bg-gray-100 rounded-lg'
                                to='/create-account'
                            >
                                Create account
                            </Link>
                        </>
                    }
                    { !app && auth.isAuth &&
                        <>
                            <Link
                                className='inline-block py-2 px-4 text-gray-700 bg-white hover:bg-gray-100 rounded-lg'
                                to='/app'
                            >
                                Go to App
                            </Link>
                        </>
                    }
                    { auth.isAuth &&
                        <MyAccount signOut={ signOut }/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
