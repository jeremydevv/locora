export default function(Origin : string) {

    if (Origin?.startsWith("http://localhost")) return true;
    if (Origin?.startsWith("https://waitlist-dev.locora.pages.dev")) return true;
    if (Origin?.startsWith("https://development.locora.pages.dev")) return true;
    if (Origin?.startsWith("https://locora.org")) return true;
    if (Origin?.startsWith("https://api.locora.org")) return true;
    return false

}