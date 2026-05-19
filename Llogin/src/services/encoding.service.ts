//convert to base64 url 
export const toBase64URL = (obj: Record<string, any>): string => {
    // convert to string json
    const json = JSON.stringify(obj)
    //convert to base64
    const base64 = Buffer.from(json).toString("base64")
    //convert to base64 url
    const base64Url = base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");


    return base64Url
}

export const toBase64URLString = (str: string): string => {
    //convert to base64
    const base64 = Buffer.from(str).toString("base64")
    //convert to base64 url
    const base64Url = base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");


    return base64Url
}


export const decodeBase64URL = (str: string): string => {
    // convert to base64 
    const base64 = str
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(str.length + (4 - (str.length % 4)) % 4, "=");

    return Buffer.from(base64, "base64").toString("utf-8");
}
