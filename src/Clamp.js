export default function Clamp(a, amin, amax) {
    if (a < amin) {
        return amin
    }
    if (a > amax) {
        return amax
    }
    return a
}

