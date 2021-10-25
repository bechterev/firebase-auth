import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { ServiceAccount } from 'firebase-admin';


const csrfMiddleware=csrf({cookie: true})




  @Controller('user')
  export class UserController {
  constructor( private configService: ConfigService) {
    const adminConfig: ServiceAccount = {
        "projectId": this.configService.get<string>('database.FIREBASE_PROJECT_ID'),
        "privateKey": this.configService.get<string>('database.FIREBASE_PRIVATE_KEY').replace(/\\n/g,'\n'),
        "clientEmail": this.configService.get<string>('database.FIREBASE_CLIENT_EMAIL')
      };
    admin.initializeApp({
        credential: admin.credential.cert(adminConfig as any),
        databaseURL: configService.get<string>('DATABASE_URL')
      });
  }
 
  @Get('user/login')
  login(@Req() request,@Res() response) {
    response.json('is login');
  }
  @Get('user/profile')
  getProfile(@Req() request,@Res() response) {
      const sessionCookie=request.cookies.session || ''
      try{
      admin.auth().verifySessionCookie(sessionCookie).then((user)=>{
      response.send(user)
    })
    }
    catch(error) {
      response.send('/user/login')
    }
  }
  @Post('user/signup')
  createUser(@Req() request,@Res() response) {
    const {email,password,displayName}=request.body
    admin.auth().createUser({
      email: email,
      password:password,
      displayName: displayName
    }).then(()=>{
      response.status(200).send('ok')
    })
  }
  @Post('user/login')
  async getHi(@Req() request,@Res() response){
    const expiresIn=60*60;
    const idToken=request.body.idToken.toString()
    try{
      admin.auth().createSessionCookie(idToken,{expiresIn}).then((sessionCookie)=>{        
      response.cookie('session',sessionCookie).json({status:'sucess'})
    })}
    catch(e) {
      response.status(401).redirect('/user/login')
    }
  }
  @Post('user/logout')
  logOut(@Req() request,@Res() response){
      response.clearCookie('session')
      response.redirect('/user/login')
    }
  }