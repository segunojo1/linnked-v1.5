export function getScrambledUrl(url: string): string {
    const params = new URL(url).searchParams;
    const scrambledId = params.get("scrambledId");
    return scrambledId ? `https://linnnked.vercel.app/v/${scrambledId}` : "";
}