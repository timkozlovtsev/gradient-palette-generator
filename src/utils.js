export const clamp = (v, a, b) => {
    return Math.min(b, Math.max(a, v));
}

export const validateHex = (hex) => {
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
    h %= 360;
    s /= 100;
    v /= 100;

    let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);

    let r = Math.round(f(5) * 255);
    let g = Math.round(f(3) * 255);
    let b = Math.round(f(1) * 255);

    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

export const hslToHsv = ({ h, s, l }) => {
    h %= 360;
    s /= 100;
    l /= 100;

    const v = l + s * Math.min(l, 1 - l);

    const sHsv = v === 0 ? 0 : 2 * (1 - (l / v));

    return {
        h: h,
        s: sHsv * 100,
        v: v * 100
    };
}

export const hslToHex = ({ h, s, l }) => {
    h %= 360;
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

export const hexToHsv = (hex) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    } else if (hex.length === 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    r = parseInt(r);
    g = parseInt(g);
    b = parseInt(b);

    r /= 255;
    g /= 255;
    b /= 255;

    let h, s, v;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;

    v = max;

    if (delta === 0) {
        h = 0;
        s = 0;
    } else {
        s = delta / max;
        if (r === max) {
            h = (g - b) / delta;
        } else if (g === max) {
            h = 2 + (b - r) / delta;
        } else {
            h = 4 + (r - g) / delta;
        }
        h *= 60;
        if (h < 0) {
            h += 360;
        }
    }

    return {
        h: Math.round(h),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}
