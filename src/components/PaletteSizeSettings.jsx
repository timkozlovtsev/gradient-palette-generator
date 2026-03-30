function PaletteSizeSettings({ height, setHeight, width, setWidth }) {
    return (
        <div className='editor-setting flex gap-1.5 inset-shadow-border'>

            <label className='font-medium'>Height
                <input
                    className='w-full p-1.5 mt-1 rounded-xl shadow-xs
                        transition-all duration-200 ease-in-out
                        inset-shadow-border hover:inset-shadow-gray-400 focus:inset-shadow-blue-400'
                    type='number'
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
            </label>
            <label className='font-medium'>Width
                <input
                    className='w-full p-1.5 mt-1 rounded-xl shadow-xs transition-all
                        duration-200 ease-in-out
                        inset-shadow-border hover:inset-shadow-gray-400 focus:inset-shadow-blue-400'
                    type='number'
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                />
            </label>
        </div>
    );
}

export default PaletteSizeSettings;
