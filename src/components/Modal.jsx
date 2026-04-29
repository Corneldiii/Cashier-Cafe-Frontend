import React from 'react'

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80  ">
            <div className="bg-white min-w-100 min-h-120 p-5 font-mono  animate-fadeIn  border-4 border-sky-300 border-solid">
                <div className=" flex justify-between">
                    <h2 className="text-xl text-center font-semibold mb-4">{title}</h2>
                    <button
                        onClick={onClose}
                        className='cursor-pointer '
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="w-full h-0.5 bg-black mb-10"></div>
                <div className='h-fit w-full' >{children}</div>
                <div className="mt-4 flex justify-end">
                </div>
            </div>
        </div>
    )
}

export default Modal
