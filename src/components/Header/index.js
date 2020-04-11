import React from 'react'
import { Link, navigate } from 'gatsby'

import { useAuth } from '../../lib/AuthContext'

const Header = () => {
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
                        <a
                            href='#'
                            className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6'
                        >
                            Solutions
                        </a>
                        <a
                            href='#'
                            className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6'
                        >
                            Pricing
                        </a>
                        <a
                            href='#'
                            className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6'
                        >
                            Desktop
                        </a>
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
                    { auth.isAuth &&
                        <>
                            <Link
                                className='inline-block py-2 px-4 text-gray-700 bg-white hover:bg-gray-100 rounded-lg'
                                to='/app'
                            >
                                Go to App
                            </Link>
                            <button
                                className='inline-block ml-2 py-2 px-4 text-gray-700 bg-gray hover:bg-gray-100 rounded-lg'
                                onClick={ signOut }
                            >
                                Sign Out
                            </button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
