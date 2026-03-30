import { useRef, useState, useEffect } from 'react';
import { hexToHsv, hsvToHex, validateHex } from '../utils';
import ColorDot from './ColorDot';

function ColorPicker({ label, hex, setHex, setPreviewHex }) {
    const saturationValueRef = useRef(null);
    const hueRef = useRef(null);
    const [isDragging, setIsDragging] = useState('none');
    const [localHex, setLocalHex] = useState('#000000');
    const [lastValidLocalHex, setLastValidLocalHex] = useState('#000000');

    const handleSaturationValueDrag = (event) => {
        if (event.buttons === 1) {
            const rect = saturationValueRef.current.getBoundingClientRect();
            let hsv = hexToHsv(hex);
            let s = event.clientX - rect.left;
            let v = event.clientY - rect.top;
            s = Math.max(0, Math.min(s / rect.width, 1));
            v = 1 - Math.max(0, Math.min(v / rect.height, 1));
            hsv.s = s * 100;
            hsv.v = v * 100;
            setLocalHex(hsvToHex(hsv));
            setHex(hsvToHex(hsv));
        }
    }

    const handleHueDrag = (event) => {
        if (event.buttons === 1) {
            const rect = hueRef.current.getBoundingClientRect();
            let hsv = hexToHsv(hex);
            let h = event.clientX - rect.left;

            h = Math.max(0, Math.min(h / rect.width, 1));
            hsv.h = h * 360;
            setLocalHex(hsvToHex(hsv));
            setHex(hsvToHex(hsv));
        }
    }

    const commitHex = () => {
        let validated = validateHex(localHex);
        if (validated === undefined) {
            setLocalHex(lastValidLocalHex);
        } else {
            setLocalHex(validated);
            setHex(validated);
            setLastValidLocalHex(validated);
        }
    }

    const getRenderingHex = () => {
        return validateHex(localHex) || lastValidLocalHex;
    }

    useEffect(() => {
        const handleGlobalMove = (e) => {
            if (isDragging === 'saturationValue') handleSaturationValueDrag(e);
            else if (isDragging === 'hue') handleHueDrag(e);
        };

        const handleGlobalUp = () => setIsDragging('none');

        if (isDragging) {
            window.addEventListener('mousemove', handleGlobalMove);
            window.addEventListener('mouseup', handleGlobalUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleGlobalMove);
            window.removeEventListener('mouseup', handleGlobalUp);
        };
    }, [isDragging]);

    useEffect(() => {
        setLocalHex(hex);
        setLastValidLocalHex(hex);
    }, [hex]);

    return (
        <div className='gap-6 flex flex-col editor-setting'>
            <label className='font-medium'>{label}
                <input
                    className='p-1.5 mt-1 rounded-xl shadow-xs
                        transition-all duration-200 ease-in-out
                        inset-shadow-border hover:inset-shadow-gray-400 focus:inset-shadow-blue-400'
                    value={localHex}
                    onChange={(e) => {
                        setLocalHex(e.target.value);
                        setPreviewHex(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            commitHex();
                        }
                    }}
                    onBlur={() => commitHex()}
                />
            </label>
            <div ref={saturationValueRef}
                tabIndex={-1}
                onMouseDown={(e) => {
                    e.preventDefault();
                    saturationValueRef.current.focus();
                    setIsDragging('saturationValue');
                    handleSaturationValueDrag(e);
                }}
                className='relative w-full aspect-square'>
                <div className='absolute rounded-md inset-0 inset-shadow-border'
                    style={{
                        backgroundColor: `hsl(${hexToHsv(getRenderingHex()).h}, 100%, 50%)`
                    }} />
                <div className='absolute rounded-md inset-0 bg-linear-to-r from-white to-transparent' />
                <div className='absolute rounded-md inset-0 bg-linear-to-t from-black to-transparent' />
                <div className='absolute'
                    style={{
                        left: `${hexToHsv(getRenderingHex()).s}%`,
                        top: `${100 - hexToHsv(getRenderingHex()).v}%`
                    }}>
                    <ColorDot hsv={hexToHsv(getRenderingHex())} isDragging={isDragging === 'saturationValue'} />
                </div>
            </div>
            <div ref={hueRef}
                onMouseDown={(e) => {
                    e.preventDefault();
                    hueRef.current.focus();
                    setIsDragging('hue');
                    handleHueDrag(e);
                }}
                className='relative h-3 mx-1.25 rounded-md bg-linear-to-r/hsl
                    inset-shadow-border
                    from-[hsl(0,100%,50%)] via-[hsl(180,100%,50%)] to-[hsl(359,100%,50%)]'>
                <div className='absolute'
                    style={{
                        left: `${hexToHsv(getRenderingHex()).h / 360 * 100}%`,
                        top: '50%'
                    }}>
                    <ColorDot hsv={{ h: hexToHsv(getRenderingHex()).h, s: 100, v: 100 }} isDragging={isDragging === 'hue'} />
                </div>
            </div>
        </div>
    );
}


//bg-linear-to-r/increasing from-[#ff0000] via-[#00ffff] to-[#ff0000]
export default ColorPicker;
