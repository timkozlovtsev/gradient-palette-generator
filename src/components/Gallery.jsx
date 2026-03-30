import '../index.css';

function Gallery() {
    return (
        <div className='grow max-w-48 flex flex-col'>
            <span className='editor-setting font-medium'>Gallery</span>
            <span className='text-gray-600'>TODO: add sample palettes</span>
            <div className='editor-setting flex flex-col gap-1.5'>
                <span>Example</span>
                <div className='bg-gray-200 rounded-xl w-full aspect-square'></div>
                <div className='flex justify-between'>
                    <button className='cursor-pointer px-3 py-1
                        transition-all duration-200 ease-in-out
                        shadow-xs rounded-lg inset-shadow-border hover:inset-shadow-gray-400'
                        onClick={()=>{alert("Пока не реализованно")}}>
                        Edit
                    </button>
                    <button  className='cursor-pointer px-3 py-1
                        transition-all duration-200 ease-in-out
                        shadow-xs rounded-lg inset-shadow-border hover:inset-shadow-gray-400'
                        onClick={()=>{alert("Пока не реализованно")}}>
                        View
                        </button>
                </div>
            </div>
        </div>
    );
}

export default Gallery;
