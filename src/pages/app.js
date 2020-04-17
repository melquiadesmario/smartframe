import React, { useEffect, useState } from 'react'
import { Router } from '@reach/router'
import { navigate } from 'gatsby'
import { useAuth } from '../lib/AuthContext'

import Layout from '../components/Layout'
import CreateScene from '../client-side-routes/app/CreateScene'
import Scene from '../client-side-routes/app/Scene'
import Scenes from '../client-side-routes/app/Scenes'
import UpdatePassword from '../client-side-routes/app/UpdatePassword'
import Devices from '../client-side-routes/app/Devices'

const ShowEmailNotification = () => {
    const auth = useAuth()
    const [emailSent, setEmailSent] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if(auth.isAuthReady && !auth.isAuth){
            navigate('/sign-in')
        }
    }, [auth])

    const resendEmailVerification = async () => {
        try{
            setError(false)
            await auth.resendEmailVerification()
            setEmailSent(true)
        }catch(errr){
            setEmailSent(false)
            setError(true)
        }
    }

    if(!auth.isAuthReady){
        return null
    }
    
    if(!auth.emailVerified){
        return(
            <div className='container mx-auto mt-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' role='alert'>
                <p className='font-bold'>Email Failed ({ auth.email })</p>
                <p>Please, confirm your email address.</p>
                { !emailSent &&
                    <button
                        className='bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded'
                        onClick={ resendEmailVerification }
                    >
                        Click here to resend email confirmation.
                    </button>
                }
                { emailSent &&
                    <p>Verification e-mail sent. Please, check your inbox and follow the instructions.</p>
                }
                { error &&
                    <p>Error, try again in few minutes.</p>
                }
            </div>
        )
    }

    return null
}

const App = () => {
    return(
        <Layout app>
            <ShowEmailNotification />
            <div className='container mx-auto mt-10'>
                <Router basepath='/app'>
                    <CreateScene path='/create-scene' />
                    <Scene path='/scene/:sceneId' />
                    <Scenes path='/' />
                    <UpdatePassword path='/update-password' />
                    <Devices path='/devices' />
                </Router>
            </div>
        </Layout>
    )
}

export default App
