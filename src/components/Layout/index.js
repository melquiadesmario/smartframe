import React from 'react'

import Header from '../Header'
import Footer from '../Footer'
import { AuthProvider } from  '../../lib/AuthContext'

import './styles.css'

const Layout = ({ children }) => {
    return(
        <AuthProvider>
            <div>
                <div className='font-sans bg-white flex flex-col min-h-screen w-full'>
                    <div>
                        <Header />
                        { children }
                        <Footer />
                    </div>
                </div>
            </div>
        </AuthProvider>
    )
}

export default Layout
