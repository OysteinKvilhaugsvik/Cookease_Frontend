import jwt_decode from "jwt-decode";

// this can be used to get email from token
export function getPropertyFromJwtToken(token: string, property: string) {
    let decoded: any = jwt_decode(token);
    return decoded[property];
}