import { Request, Response, NextFunction } from "express"
import {User} from '../models/User'
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Auth = {

   private: async (req: Request, rest: Response, next: NextFunction) => {
    let sucess = false;
   
    //fazer verificação de auth(padrão token jwt)
    if(req.headers.authorization) {
      
     const [authType, token] = req.headers.authorization.split(' ');
     if(authType === 'Bearer'){
      try {
      const decoded = JWT.verify(
       token,process.env.JWT_SECRET_KEY as string
       );
       sucess = true;
     
      } catch(err) {
      

      }
     }     


    }
   









    /*//fazer verificação de auth(padrão basic auth)
   if(req.headers.authorization) {
     let hash: string = req.headers.authorization.substring(6);                                                              
     //console.log("HASH", hash);
     let decoded: string = Buffer.from(hash, 'base64').toString();
    // console.log("DECODED", decoded); 
     let data: string[] = decoded.split(':');
     
     if(data.length === 2) {
        let hasUser = await User.findOne({
         where: {
          email: data[0],
          password: data[1]
         }


        });
       if(hasUser) {
        sucess = true;
       }


     }
   }
   */





   if(sucess) {
    next();  
   } else {

    rest.status(403);//não autorizado
    rest.json({error: 'Não autorizado'})

   }
    
    
    
   
   }


}