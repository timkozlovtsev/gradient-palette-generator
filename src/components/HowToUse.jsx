function HowToUse({ hide }) {
    return (
        <div className='fixed top-0 left-0 h-screen w-screen bg-[rgba(180,180,180,0.2)] 
            flex items-center justify-center'
            onMouseDown={() => hide()}>
            <div className='flex flex-col bg-white editor-setting min-w-1/2 h-fit'>
                <ul className="flex flex-col gap-1">
                    <li>
                        <span className="text-gray-400">1. </span>
                        <span>Select the cell in the central area</span>
                    </li>
                    <li>
                        <span className="text-gray-400">2. </span>
                        <span>Adjust the top and bottom colors of the corresponding gradient in the left panel</span>
                    </li>
                    <li>
                        <span className="text-gray-400">3. </span>
                        <span>Specify the interpolation method</span>
                    </li>
                    <li>
                        <span className="text-gray-400">4. </span>
                        <span>To change the size of the palette, use the input fields in the left panel</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default HowToUse;
