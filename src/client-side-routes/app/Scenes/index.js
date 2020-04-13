import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import firebase from '../../../lib/firebase'
import { useAuth } from '../../../lib/AuthContext'

const Scene = ({ scene }) => {
    return(
        <div className='max-w-sm rounded overflow-hidden shadow-lg mt-5'>
            <img className='w-full' src='https://source.unsplash.com/random/384x234' alt='Random Image' />
            <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>
                    <Link
                        className='hover:underline'
                        to={`/app/scene/${ scene.id }`}
                    >
                        { scene.name }
                    </Link>
                </div>
            </div>
        </div>
    )
}

const Scenes = () => {
    const auth = useAuth()
    const [sceneName, setSceneName] = useState('')
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
                        console.log(`${ doc.id } => `, doc.data())
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
        setSceneName(event.target.value)
    }

    const createScene = () => {
        const newSceneRef = db
            .collection('scenes')
            .doc(auth.uid)
            .collection('scenes')
            .doc()
        
            newSceneRef.set({
            name: sceneName
        })
    }

    return(
        <div className='container max-w-full mx-auto md:py-5 px-6'>
            <div className='max-w-sm mx-auto px-6'>
                <div className='relative flex flex-wrap'>
                    <div className='w-full relative'>
                        <div className='md:mt-0'>
                            <div className='text-center font-semibold text-black'>
                                Create your Scenes
                            </div>
                            <form className='mt-2'>
                                <div className='mx-auto max-w-lg '>
                                    <div className='py-1'>
                                        <span className='px-1 text-sm text-gray-600'>Name</span>
                                        <input
                                            className='text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
                                            placeholder='Create New Scene'
                                            type='text'
                                            name='sceneName'
                                            value={ sceneName }
                                            onChange={ handleInputChange }
                                        />
                                    </div>
                                    <button
                                        className='mt-1 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black'
                                        type='button'
                                        onClick={ createScene }
                                    >
                                        Create Scene
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='font-semibold text-black mt-5'>
                List Scenes
                <hr />
            </div>
            <div className='grid grid-cols-3 gap-4'>
                {
                    scenes.map(scene => <Scene key={ scene.id } scene={ scene } />)
                }
            </div>
        </div>
    )
}

export default Scenes
