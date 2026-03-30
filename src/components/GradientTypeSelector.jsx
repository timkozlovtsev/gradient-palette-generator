import { useState } from "react";

function GradientTypeSelector({ gradientTypes, selectedGradientType, setSelectedGradientType }) {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div className='editor-setting flex flex-col gap-1.5'>
            <span className='font-medium'>
                Gradient interpolation
            </span>
            <div className='relative min-w-[calc(50%-var(--spacing)*1.5)] w-fit'>
                <button className='cursor-pointer w-full text-start
                    transition-all duration-200 ease-in-out
                    p-1.5 rounded-xl shadow-xs inset-shadow-border hover:inset-shadow-gray-400'
                    onClick={() => setIsVisible(!isVisible)}
                    onBlur={() => setIsVisible(false)}>
                    {selectedGradientType}
                </button>
                <div className={`absolute flex flex-col m-0 -ml-2 mt-5 p-3 min-w-32 gap-1
                editor-setting bg-white z-10
                ${isVisible ? 'block' : 'hidden'}`}>
                    {gradientTypes.map(type => (
                        <span key={type}
                            onMouseDown={() => setSelectedGradientType(type)}
                            className={`p-1 px-2 rounded-md
                            transition-all duration-100
                            cursor-pointer
                            hover:bg-neutral-100
                        ${type === selectedGradientType ? 'bg-blue-100!' : ''}`}>
                            {type}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GradientTypeSelector;
