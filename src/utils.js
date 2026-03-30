import convert from 'color-convert';

export const clamp = (v, a, b) => {
    return Math.min(b, Math.max(a, v));
}

export const validateHex = (hex) => {
    let result = validateHex_internal(hex);
    if (result) {
        return result.toUpperCase();
    }
}

const validateHex_internal = (hex) => {
    if (hex[0] === '#') {
        hex = hex.slice(1, hex.length);
    }
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
    if (hex.length === 6) {
        r = clamp(r, 0, 255);
        g = clamp(g, 0, 255);
        b = clamp(b, 0, 255);
        if (isNaN(r) || isNaN(g) || isNaN(b)) {
            return;
        }
        return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    }
    if (hex.length === 3) {
        return validateHex(`#${hex.split('').map(l => l.repeat(2)).join('')}`);
    }
    if (hex.length === 2) {
        r = clamp(r, 0, 255);
        if (isNaN(r)) {
            return undefined;
        }
        return `#${r.toString(16).padStart(2, '0').repeat(3)}`;
    }
    if (hex.length === 1) {
        r = clamp(r, 0, 15);
        if (isNaN(r)) {
            return undefined;
        }
        return `#${r.toString(16).repeat(6)}`;
    }
}

export const hsvToHex = ({ h, s, v }) => {
    return '#' + convert.hsv.hex(h, s, v);
}

export const hslToHsv = ({ h, s, l }) => {
    let hsv = convert.hsl.hsv(h, s, l);
    return { h: hsv[0], s: hsv[1], v: hsv[2] };
}

export const hslToHex = ({ h, s, l }) => {
    return '#' + convert.hsl.hex(h, s, l);
}

export const hexToHsv = (hex) => {
    let hsv = convert.hex.hsv(hex);
    return { h: hsv[0], s: hsv[1], v: hsv[2] };
}
