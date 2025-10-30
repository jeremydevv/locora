export default function pemToArrayBuffer(pem: string): ArrayBuffer {
    const b64 = pem
        .replace(/-----(BEGIN|END)[\w\s]+-----/g, '')
        .replace(/\s+/g, '');

    const binary = atob(b64);

    const bytes = new Uint8Array(binary.length);
    
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes.buffer;
}
