// utils/date.ts
export function formatDateTime(isoString: string) {
    if (!isoString) return "";

    // 如果字符串已经包含时区信息（Z 或 ±hh:mm），则直接使用
    const hasTZ = /(?:Z|[+\-]\d{2}:\d{2})$/.test(isoString);

    // 如果不包含时区，假定它是 UTC（后端返回没有时区但实际上是 UTC），则在末尾加 'Z'
    const safeIso = hasTZ ? isoString : isoString + "Z";

    const date = new Date(safeIso);

    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");

    return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
}
