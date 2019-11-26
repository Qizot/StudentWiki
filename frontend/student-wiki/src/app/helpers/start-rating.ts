

export const starRating = (stars: number) => {
    let s = "";
    const full = Math.min(Math.floor(stars-0.01) + 1, 5);
    s += "★ ".repeat(full);
    s += "☆".repeat(5 - full);
    return s;
}