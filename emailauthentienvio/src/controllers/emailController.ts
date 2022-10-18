import { Request, Response } from "express";
import nodemailer from 'nodemailer';



export const contato = async (req: Request, res: Response) => {
 // passo 1: configurar o transporter(configurar servidor smtp)
 let transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "372af7f4a4a3fe",
    pass: "aaf0af4b987312"
  }
});



 //passo 2: configurar a mensagem
let message = {

  from: 'nao-responda@suporteempresa.com.br',
  to: 'suporteempresa@hotmail.com',
  replyTo: req.body.from,
  subject: req.body.subject,
  html: req.body.email,
  text: req.body.email

};
 //passo 3: enviar a mensagem
let info = await transport.sendMail(message);

console.log("INFO",info);



 res.json({success:true});


}