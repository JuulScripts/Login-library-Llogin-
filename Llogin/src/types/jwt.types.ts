export interface tokenPayloadData {
    username: string,
    id: number
    // and any additional data
}

export interface tokenHeaderData {
    alg: string
    typ: "JWT"
    // and any additional data
}