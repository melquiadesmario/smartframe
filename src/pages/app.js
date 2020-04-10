import React from 'react'
import { Router } from '@reach/router'
import { useAuth } from '../lib/AuthContext'

import Layout from '../components/Layout'

const CreateScene = () => {
    const auth = useAuth()
    return(
        <div>
            <h1>Create Scene</h1>
            <pre>{ JSON.stringify(auth) }</pre>
        </div>
    )
}

const Scenes = () => {
    return <h1>Scenes</h1>
}

const ShowEmailNotification = () => {
    const auth = useAuth()

    const resendEmailVerification = async () => {
        try{
            await auth.resendEmailVerification()
        }catch(errr){

        }
    }
    
    if(!auth.emailVerified){
        return(
            <div className='container mx-auto mt-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' role='alert'>
                <p className='font-bold'>Email Failed ({ auth.email })</p>
                <p>Please, confirm your email address.</p>
                <button
                    className='bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded'
                    onClick={ resendEmailVerification }
                >
                    Click here to resend email confirmation.
                </button>
            </div>
        )
    }

    return null
}

const App = () => {
    return(
        <Layout>
            <ShowEmailNotification />
            <h1>My App</h1>
            <Router basepath='/app'>
                <CreateScene path='/create-scene' />
                <Scenes path='/scenes' />
            </Router>
        </Layout>
    )
}

export default App
