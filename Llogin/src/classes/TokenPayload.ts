import { generateSignature } from "../services/auth.service";
import { toBase64URL, toBase64URLString } from "../services/encoding.service";
import { tokenHeaderData, tokenPayloadData } from "../types/jwt.types";

export default class TokenPayload {
    public header: tokenHeaderData;
    public payload: tokenPayloadData;
    public algorithm: string;

      constructor(header: tokenHeaderData, payload: tokenPayloadData, algorithm: string) {
       this.header = header;
       this.payload = payload
       this.algorithm = algorithm
      }

      public createJwt(): string {
        //turn payload into base64URL
        let headerBase64URL = toBase64URL(this.header)
        let payloadBase64URL = toBase64URL(this.payload)
         
        //create signature
        let signature = toBase64URLString(generateSignature(`${headerBase64URL}.${payloadBase64URL}`, this.algorithm))
        
        return `${headerBase64URL}.${payloadBase64URL}.${signature}`
      }
}