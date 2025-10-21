export default function GoToSection(section : string) {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
}