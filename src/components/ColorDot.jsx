import { hsvToHex } from "../utils";

function ColorDot({ hsv, isDragging }) {
    return (
        <div className='relative -translate-1/2 w-5 h-5
            ease-out transition-all duration-75
            rounded-full inset-shadow-border bg-white'>
            <div style={{
                backgroundColor: hsvToHex(hsv)
            }} className='absolute top-1/2 left-1/2 -translate-1/2 w-5/10 h-5/10
                inset-shadow-border rounded-full' />
        </div >
    );
}

export default ColorDot;
