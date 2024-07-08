import React from 'react'
import { close } from '../../assets'

const PostTelegram = ({onClose}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-2">
    <div className="bg-[#29303F] rounded-lg shadow-lg p-8 w-full max-w-5xl relative text-white">
      <button onClick={onClose} className="absolute top-4 right-4">
        <img src={close} alt="Close" className="w-8 h-8" />
      </button>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold">Archived Links</h2>
      </div>
      </div>
      </div>
  )
}

export default PostTelegram