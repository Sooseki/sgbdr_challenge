import path from 'path';
import dotenv from 'dotenv'
import jwt  from "jsonwebtoken"
import { JwtPayload } from 'jsonwebtoken';
import { Body, Get, Path, Post, Route } from 'tsoa';
import { IAccessMail } from '../../types/api/IAccessMail';
import { connect } from 'node-mailjet';

/**
 * Envoie d'un email avec génération d'un token d'accès.
 */

@Route("/auth")
export class MailConfirm {
    
    @Post('/email')
    public async sendMail(
        @Body() body: IAccessMail
    ): Promise<IAccessMail> {
        
        const token = jwt.sign({
            data: body.email
          }, process.env.ACCESS_TOKEN_SECRET || "sdk5fk5fkf", { expiresIn: '24h' });

        body.identityToken = token;
        const request = await connect(process.env.MJ_APIKEY_PUBLIC || "", process.env.MJ_APIKEY_PRIVATE || "")
            .post("send", { 'version': 'v3.1' })
            .request({
                "Messages": [{
                    "From": {
                        "Email": process.env.MAIL_TO_CHALLENGE,
                        "Name": "API Node"
                    },
                    "To": [{
                        "Email": body.email,
                        "Name": body.email
                    }],
                    "Subject": "Link challenge",
                    "TextPart": `Your link for the challenge http://localhost:3000/verify?token=${body.identityToken}`
                }]
            })
        request
            //.then((result: any) => console.log(result.body))
            //.catch((err: any) => console.log(err.statusCode))

        return body
    }

    @Get('/verify/{identityToken}')
    public async getMail(
        @Path() identityToken: string): Promise<string | JwtPayload> {
        const decodedToken = jwt.verify(identityToken, process.env.ACCESS_TOKEN_SECRET || "maeKMdGKpxTSaBPa");
        return decodedToken;
    }
}