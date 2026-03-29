export async function shareProject(title, text, url) {
    if (navigator.share) {
        try {
            await navigator.share({
                title: title,
                text: text,
                url: url,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        // Fallback to clipboard
        try {
            await navigator.clipboard.writeText(`${title}\n${text}\n${url}`);
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }
}
