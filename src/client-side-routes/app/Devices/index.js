import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import firebase from '../../../lib/firebase'
import { useAuth } from '../../../lib/AuthContext'

const Devices = () => {
    const auth = useAuth()
    const [deviceId, setDeviceId] = useState('')
    const [deviceStatus, setDeviceStatus] = useState('')
    const [scenes, setScenes] = useState([])
    const db = firebase.firestore()

    useEffect(() => {
        if(auth.isAuthReady){
            db
                .collection('scenes')
                .doc(auth.uid)
                .collection('scenes')
                .onSnapshot(querySnapshot => {
                    const docs = []
                    querySnapshot.forEach(doc => {
                        docs.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    })
                    setScenes(docs)
                })
        }
    }, [db, auth])

    const handleInputChange = event => {
        setDeviceId(event.target.value)
    }

    const activateDevice = async () => {
        const docRef = db
            .collection('temp-devices')
            .doc(deviceId)

        const doc = await docRef.get()
        const deviceData = doc.data()
        
        if(deviceData){
            setDeviceStatus('Valid')
            docRef.update({
                owner: auth.uid
            })
        }else{
            setDeviceStatus('Invalid')
        }
    }

    return(
        <div className='container max-w-full mx-auto md:py-5 px-6'>
            <div className='max-w-sm mx-auto px-6'>
                <div className='relative flex flex-wrap'>
                    <div className='w-full relative'>
                        <div className='md:mt-0'>
                            <div className='text-center font-semibold text-black'>
                                Devices
                            </div>
                            <form className='mt-2'>
                                <div className='mx-auto max-w-lg '>
                                    <div className='py-1'>
                                        <span className='px-1 text-sm text-gray-600'>Device ID</span>
                                        <input
                                            className='text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
                                            placeholder='Insert your Device ID'
                                            type='text'
                                            name='deviceId'
                                            value={ deviceId }
                                            onChange={ handleInputChange }
                                        />
                                    </div>
                                    <button
                                        className='mt-1 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black'
                                        type='button'
                                        onClick={ activateDevice }
                                    >
                                        Activate Device
                                    </button>
                                </div>
                            </form>
                            { deviceStatus === 'Valid' &&
                                <div className='mt-5 bg-green-100 border-l-4 border-green-500 text-green-700 p-4' role='alert'>
                                    <p className='font-bold'>Status ID</p>
                                    <p>Device ID {deviceStatus}.</p>
                                </div>
                            }
                            { deviceStatus === 'Invalid' &&
                                <div className='mt-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' role='alert'>
                                    <p className='font-bold'>Status ID</p>
                                    <p>Device ID {deviceStatus}.</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Devices
