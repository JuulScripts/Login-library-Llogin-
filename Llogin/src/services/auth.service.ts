import { error } from "console";
import crypto from "crypto"
import { decodeBase64URL } from "./encoding.service";

//simple signature generator using SHA256
export const generateSignature = (text: string, alg?: string | null): string => {
    const KEY = process.env.SECRET_KEY; 
    const ALG = alg || process.env.ALGORITHM 
  

    // make sure enviornment variables are valid
    if (!KEY) 
    throw new Error("SECRET_KEY is undefined or null in .env, please define it.");

    if (!ALG)
    throw error("ALGORITHM is undefined or null in .env, please define it.");

    // create the signature
    let signature = crypto.createHmac(ALG, KEY).update(text).digest("hex");

    return signature
}

 export const validateSignature = (jwt: string) : boolean => {
  // split up header, payload  and signature 
  const [header, payload, signature] = jwt.split(".")
  // convert header (base64URL -> string -> JSON) 
  const headerJson =  JSON.parse(decodeBase64URL(header))

  //create expected signature using the headers algorithm and provided header and payload 
  const expectedSignature = generateSignature(`${header}.${payload}`, headerJson.alg)

  if (signature == expectedSignature) return true;

  return false
 }