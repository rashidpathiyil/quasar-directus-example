// Turn asset url into reusable function
export function getAssetURL(id: string): string {
    if (!id) return ''
    return `${process.env.DIRECTUS_ASSET_URL}${id}`;
    // Update env as per project, if you are not using vite
}
