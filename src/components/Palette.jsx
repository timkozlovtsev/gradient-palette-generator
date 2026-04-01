import { hsvToHex } from "../utils";

function Palette({ paletteData, setSelectedCell }) {
    return (
        <div className='grow p-2 aspect-square max-w-sm
            rounded-lg inset-shadow-border shadow-xl'>
            <div
                style={{
                    '--grid-cols': paletteData.width,
                    '--grid-rows': paletteData.height
                }}
                className='grid h-full
            grid-cols-[repeat(var(--grid-cols),minmax(0,1fr))]  
            grid-rows-[repeat(var(--grid-rows),minmax(0,1fr))]'>
                {paletteData.previewCells.map((cell, index) => (
                    <div key={index}
                        onClick={() => setSelectedCell(index)}
                        style={{
                            '--top-color': hsvToHex(cell.top),
                            '--bottom-color': hsvToHex(cell.bottom),
                            '--interpolation-mode': cell.gradientType
                        }}
                        className={
                            (paletteData.selectedCellIndex === index ? 'border-2 border-white ' : '') +
                            'bg-[linear-gradient(in_var(--interpolation-mode)_to_top,var(--bottom-color),var(--top-color))]'}
                    />
                ))}
            </div>
        </div>
    );
}

export default Palette;
