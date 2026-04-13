export function generateLinkId() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
    let out = "";
    for (let i = 0; i < 12; i++) {
        out += alphabet[Math.floor(Math.random() * alphabet.length)];
        
    }
    return out;
}