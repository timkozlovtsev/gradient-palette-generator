import { useState } from 'react';
import PaletteSizeSettings from './PaletteSizeSettings';
import Palette from './Palette';
import ColorPicker from './ColorPicker';
import { hexToHsv, hslToHex, hslToHsv, validateHex } from '../utils';
import GradientTypeSelector from './GradientTypeSelector';

function Editor() {
    const gradientTypes = [
        'srgb',
        'srgb-linear',
        'hsl',
        'oklch',
        'oklab'
    ]
    const defaultPaletteCell = {
        top: '#000000',
        bottom: '#000000',
        gradientType: gradientTypes[0]
    }
    const [paletteData, setPaletteData] = useState(() => {
        let width = 3;
        let height = 3;
        let obj = {
            width: width,
            height: height,
            selectedCellIndex: 0,
            cells: Array.from({ length: width * height }, () => structuredClone(defaultPaletteCell)),
            previewCells: Array.from({ length: width * height }, () => structuredClone(defaultPaletteCell))
        }
        for (let i = 0; i < width * height; i++) {
            obj.cells[i].top = hslToHsv({ h: i * 15, s: 100, l: 80 });
            obj.cells[i].bottom = hslToHsv({ h: i * 15, s: 100, l: 40 });
        }
        obj.previewCells = structuredClone(obj.cells);
        return obj;
    });

    const resizeCellsArray = (cells, width, height) => {
        let diff = width * height - cells.length;
        if (diff > 0) {
            let addend = Array.from({ length: diff }, () => structuredClone(defaultPaletteCell));
            for (let i = 0; i < diff; i++) {
                addend[i].top = hslToHsv({ h: (cells.length + i) * 15, s: 100, l: 80 });
                addend[i].bottom = hslToHsv({ h: (cells.length + i) * 15, s: 100, l: 40 });
            }
            return [...cells, ...addend];
        } else {
            return cells.slice(0, width * height);
        }
    }

    const setPaletteWidth = (width) => {
        width = Math.min(10, Math.max(1, width));
        setPaletteData((prev) => {
            const index = Math.min(width * prev.height - 1, Math.max(0, prev.selectedCellIndex));
            return {
                ...prev,
                cells: resizeCellsArray(prev.cells, width, prev.height),
                previewCells: resizeCellsArray(prev.previewCells, width, prev.height),
                width: width,
                selectedCellIndex: index
            }
        });
    }

    const setPaletteHeight = (height) => {
        height = Math.min(4, Math.max(1, height));
        setPaletteData((prev) => {
            console.log(prev)
            const index = Math.min(prev.width * height - 1, Math.max(0, prev.selectedCellIndex));
            return {
                ...prev,
                cells: resizeCellsArray(prev.cells, prev.width, height),
                previewCells: resizeCellsArray(prev.previewCells, prev.width, height),
                height: height,
                selectedCellIndex: index
            }
        });
    }

    const setSelectedCell = (cellIndex) => {
        setPaletteData((prev) => ({
            ...prev,
            selectedCellIndex: cellIndex
        }));
    }

    return (
        <div className='grow flex'>
            <div className='shrink flex flex-col min-w-0 max-w-2xs overflow-auto'>
                <span className='editor-setting font-medium inset-shadow-border'>Settings</span>
                <PaletteSizeSettings height={paletteData.height} setHeight={setPaletteHeight}
                    width={paletteData.width} setWidth={setPaletteWidth} />
                <GradientTypeSelector
                    gradientTypes={gradientTypes}
                    selectedGradientType={paletteData.cells[paletteData.selectedCellIndex].gradientType}
                    setSelectedGradientType={type => {
                        setPaletteData(prev => {
                            prev.cells[prev.selectedCellIndex].gradientType = type;
                            prev.previewCells[prev.selectedCellIndex].gradientType = type;
                            return {
                                ...prev
                            };
                        });
                    }} />
                <ColorPicker label="Top color"
                    hsv={paletteData.cells[paletteData.selectedCellIndex].top}
                    setHex={hex => {
                        setPaletteData(prev => {
                            prev.cells[prev.selectedCellIndex].top = hexToHsv(hex);
                            prev.previewCells[prev.selectedCellIndex].top = hexToHsv(hex);
                            return {
                                ...prev
                            };
                        });
                    }}
                    setPreviewHex={hex => {
                        hex = validateHex(hex);
                        setPaletteData(prev => {
                            if (hex) {
                                prev.previewCells[prev.selectedCellIndex].top = hexToHsv(hex);
                            }
                            return {
                                ...prev
                            };
                        });
                    }}
                    setHsv={hsv => {
                        setPaletteData(prev => {
                            prev.cells[prev.selectedCellIndex].top = hsv;
                            prev.previewCells[prev.selectedCellIndex].top = hsv;
                            return {
                                ...prev
                            };
                        });
                    }} />
                <ColorPicker label="Bottom color"
                    hsv={paletteData.cells[paletteData.selectedCellIndex].bottom}
                    setHex={hex => {
                        setPaletteData(prev => {
                            prev.cells[prev.selectedCellIndex].bottom = hex;
                            prev.previewCells[prev.selectedCellIndex].bottom = hex;
                            return {
                                ...prev
                            };
                        });
                    }}
                    setPreviewHex={hex => {
                        hex = validateHex(hex);
                        setPaletteData(prev => {
                            if (hex) {
                                prev.previewCells[prev.selectedCellIndex].bottom = hex;
                            }
                            return {
                                ...prev
                            };
                        });
                    }} setHsv={hsv => {
                        setPaletteData(prev => {
                            prev.cells[prev.selectedCellIndex].bottom = hsv;
                            prev.previewCells[prev.selectedCellIndex].bottom = hsv;
                            return {
                                ...prev
                            };
                        });
                    }} />
            </div>
            <div className='grow flex flex-col'>
                <div className='editor-setting'>
                    <button className='cursor-pointer px-3 py-1
                        transition-all duration-200 ease-in-out
                        shadow-xs rounded-lg inset-shadow-border hover:inset-shadow-gray-400'
                        onClick={() => { alert("Пока не реализованно") }}>
                        Save as PNG
                    </button>
                </div>
                <div className='grow flex justify-center items-center'>
                    <Palette paletteData={paletteData} setSelectedCell={setSelectedCell} />
                </div>

            </div>
        </div>
    );
}

export default Editor;
