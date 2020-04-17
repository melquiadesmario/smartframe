import React, { useState } from 'react'
import firebase from '../../../../../lib/firebase'

const COLORS = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' }
]

const ChromaKey = ({ id, uid, sceneId }) => {
    const [settings, setSettings] = useState({
        color: 'green',
        showMarkers: false
    })

    const db = firebase.firestore()

    const handleCheckChange = event => {
        const { name, value, type, checked } = event.target
        const inputType = type === 'checkbox' ? checked : value

        setSettings(oldSettings => {
            return{
                ...oldSettings,
                [name]: inputType
            }
        })
    }

    const save = () => {
        const frame = db
            .collection('frames')
            .doc(uid)
            .collection(sceneId)
            .doc(id)

        frame.update({
            settings
        })
    }

    return(
        <div className='border-solid border-2 border-gray-250 py-8 px-8 mt-2 rounded-lg'>
            <h1 className='font-bold'>ChromaKey</h1>
            <div className='inline-block relative w-64 mt-2'>
                <select
                    className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                    name='color'
                    value={ settings.color }
                    onChange={ handleCheckChange }
                >
                    {
                        COLORS.map(color => <option value={ color.value }>{ color.label }</option>)
                    }
                </select>
            </div>
            <div className='mt-4'>
                <label className='md:w-2/3 block text-gray-500 font-bold'>
                    <input
                        className='mr-2 leading-tight'
                        type='checkbox'
                        name='showMarkers'
                        checked={ settings.showMarkers }
                        onChange={ handleCheckChange }
                    />
                    <span className='text-sm'>
                        Show tracking markers
                    </span>
                </label>
            </div>
            <button
                className="mt-4 text-lg font-semibold bg-gray-800 text-white rounded-lg px-6 py-2 block shadow-xl hover:text-white hover:bg-black"
                type='button'
                onClick={ save }
            >
                Save
            </button>
        </div>
    )
}

export default ChromaKey
