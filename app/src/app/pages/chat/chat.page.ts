import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { MessageModel } from '../../models/message.model';
import { MessageService } from '../../providers/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  
  User: any;

  events:any="";
  toUser: any= "driver";
  roomCode:string;

  public message: string; // hold message for send

  editorMsg = '';
  showEmojiPicker = false;
  msgList: Array<{
    userId: any,
    User: any,
    // userAvatar: any,
    Created: any,
    Message: any,
    // upertext: any;
  }>;
  public count = 0;
  public arr = [
    {
      "messageId": "1",
      "userId": "140000198202211138",
      "userName": "Luff",
      "userImgUrl": "./assets/chat/user.jpg",
      "toUserId": "210000198410281948",
      "toUserName": "Hancock",
      "userAvatar": "./assets/chat/to-user.jpg",
      "time": 1488349800000,
      "message": "Hey, that\'s an awesome chat UI",
      "status": "success"

    }
  ];
  
  @ViewChild("content", { static: true }) content: any;

  
  constructor(
    private route: ActivatedRoute,
    private socket: Socket,
    private userService: UserData,
    private messageService: MessageService
  ) {
    // this.msgList = [
    //   {
    //     userId: this.User.FirstName,
    //     User: this.User?.FirstName,
    //     // userAvatar: "assets/chat/driver.jpg",
    //     Created: new Date(),
    //     Message: 'Hey, that\'s an awesome chat UI',
    //     // upertext: 'Hello'
    //   }
    // ];

  }

  public async scrollToBottom() {
    // this.content.scrollToBottom(100);
  }

  public async ionViewWillLeave() {
    this.events.unsubscribe('chat:received');
  }

  public async ionViewDidEnter() {
    console.log('scrollBottom');
    setTimeout(() => {
      this.scrollToBottom()
    }, 500)
    console.log('scrollBottom2');
  }

  public async logScrollStart(){
    console.log('logScrollStart');
    document.getElementById('chat-parent');
  
  }

  public async logScrolling(event){
    console.log('event',event)
  }

  public async sendMsg() {
    if( this.message.trim() != "") {
      const message = new MessageModel();
      message.message = this.message;
      message.room = this.roomCode;
      message.time = new Date();
      message.userId = this.User.FirstName;
      // this.msgList.push({
      //   userId: this.User.FirstName,
      //   User: this.User.FirstName,
      //   Created: message.time,
      //   Message: message.message,
      // });
      this.socket.emit('message', {message});
      this.message = '';
      this.content.scrollToBottom();

    }

  }

  public async getMessages() {
    this.messageService.getMessage(this.roomCode).subscribe((res) => {
      this.msgList = res[0].Messages;
      this.content.scrollToBottom();  
    });
  }

  public async ngOnInit() {
    if(this.route.snapshot.paramMap.get('roomCode')) {
      this.roomCode = this.route.snapshot.paramMap.get('roomCode')
    }
    this.getMessages();
    this.User = await this.userService.getUserProfile();
    this.socket.emit("join", this.roomCode);

    this.socket.fromEvent('message').subscribe((message: any) => {
      debugger
      this.msgList.push(message);
    });
  }

}
