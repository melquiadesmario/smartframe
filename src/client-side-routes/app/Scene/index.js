import React, { useState, useEffect } from 'react'
import firebase from '../../../lib/firebase'
import { useAuth } from '../../../lib/AuthContext'

const FRAME_TYPES = {
    chromakey: {
        key: 'chromakey',
        label: 'CHROMAKEY'
    },
    image: {
        key: 'image',
        label: 'IMAGE'
    },
    timer: {
        key: 'timer',
        label: 'TIMER'
    },
    other: {
        key: 'other',
        label: 'OTHER'
    }
}

const FrameComponents = {
    [FRAME_TYPES.chromakey.key]: ({ id }) => <h1>Chromakey: => { id }</h1>,
    [FRAME_TYPES.image.key]: ({ id }) => <h1>Image: => { id }</h1>,
    [FRAME_TYPES.timer.key]: ({ id }) => <h1>Timer: => { id }</h1>,
    [FRAME_TYPES.other.key]: ({ id }) => <h1>Other =>  { id }</h1>
}

const Scene = ({ sceneId }) => {
    const auth = useAuth()
    const [scene, setScene] = useState({})
    const [frames, setFrames] = useState([])
    const db = firebase.firestore()

    useEffect(() => {
        if(auth.isAuthReady){
            db
                .collection('scenes')
                .doc(auth.uid)
                .collection('scenes')
                .doc(sceneId)
                .onSnapshot(querySnapshot => {
                    setScene({
                        ...querySnapshot.data(),
                        id: sceneId
                    })
                })

                db
                .collection('frames')
                .doc(auth.uid)
                .collection(sceneId)
                .onSnapshot(querySnapshot => {
                    const currentFrames = []
                    querySnapshot.forEach(doc => {
                        currentFrames.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    })

                    setFrames(currentFrames)
                })
        }
    }, [db, auth])

    const createFrame = type => () => {
        const newSceneRef = db
            .collection('frames')
            .doc(auth.uid)
            .collection(sceneId)
            .doc()
        
            newSceneRef.set({
                type
            })
    }

    return(
        <div className='container'>
            <h1 className='text-center font-semibold text-black mb-4'>{ scene.name }</h1>
            <div className='grid grid-cols-4 gap-4'>
                { Object.keys(FRAME_TYPES).map(key => {
                    return(
                        <div
                            className='bg-gray-300 w-40 h-40 cursor-pointer tracking-wide text-gray-800 font-bold rounded border-b-4 border-gray-500 hover:border-gray-600 hover:bg-gray-500 hover:text-white shadow-md flex flex-col justify-center items-center'
                            key={ key }
                            onClick={ createFrame(key) }
                        >
                            <p>ADD</p>
                            <p>{ FRAME_TYPES[key].label }</p>
                        </div>
                    )
                })}
            </div>
            <hr className='mt-8 mb-6' />
            <div>
                {
                    frames.map(frame => {
                        const CurrentComponent = FrameComponents[frame.type]
                        return <p><CurrentComponent id={ frame.id } /></p>
                    })
                }
            </div>
        </div>
    )
}

export default Scene
