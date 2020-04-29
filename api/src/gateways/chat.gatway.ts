import { WebSocketGateway,SubscribeMessage,WsResponse,WebSocketServer,OnGatewayConnection,OnGatewayDisconnect,OnGatewayInit } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { RoomsService } from 'src/modules/rooms/rooms.service';
import { Employee } from 'src/repositories/entities/employee.entity';
import { AuthService } from 'src/services/auth/auth.service';
import { Logger, UnauthorizedException } from '@nestjs/common';
  
  @WebSocketGateway( )
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    @WebSocketServer()
    server;

    private logger: Logger = new Logger("Chat Gateway");
  
    connectedUsers: string[] = [];
  
    constructor(
      private jwtService: AuthService,
      private roomService: RoomsService
    ) {}

    public async afterInit(server: any) {
      this.logger.log('Initialized!')
    }
  
    /**
     *  handle user that connected online we need this functionality for another momment
     * @param socket 
     */
    public async handleConnection(socket) {
      // let user: Employee = null;
      // if(socket.handshake.query.token)
      //   try {
      //     user = await this.jwtService.verify(
      //       socket.handshake.query.token
      //     );
      //   } catch (error) {
      //     throw new UnauthorizedException()
      //   }

  
      // this.connectedUsers = [...this.connectedUsers, String("Hekuran")];
  
      // // Send list of connected users
      // this.server.emit('users', this.connectedUsers);
    }
  
    /**
     * handle user that disconected from chat also we need this functionality for another moment 
     * @param socket 
     */
    public async handleDisconnect(socket) {
      // const user: Employee = await this.jwtService.verify(
      //   socket.handshake.query.token
      // );
      const userPos = this.connectedUsers.indexOf(String("Hekuran"));
  
      if (userPos > -1) {
        this.connectedUsers = [
          ...this.connectedUsers.slice(0, userPos),
          ...this.connectedUsers.slice(userPos + 1)
        ];
      }
  
      // Sends the new list of connected users
      this.server.emit('users', this.connectedUsers);
    }
  
    
    /**
     * handle the message
     * @param client client that send the message
     * @param data data that holds the message
     */
    @SubscribeMessage('message')
    public async onMessage(client, data: any) {
      const event: string = 'message';
      const result = data.message;
  
      const message = await this.roomService.addMessage(result); // rregullo qe te shtosh mesazh
      client.broadcast.to(result.room).emit(event, message);
  
      return Observable.create(observer =>
        observer.next({ event, data: message })
      );
    }
  
    /**
     * 
     * @param client client that join to room
     * @param data informaction that send client when  join to room
     */
    @SubscribeMessage('join')
    public async onRoomJoin(client, data: any): Promise<any> {
      client.join(data);
  
      const messages = await this.roomService.get(data); // add employee to room
  
      // Send last messages to the connected user
      // client.emit('message', messages);
    }
  
    /**
     * 
     * @param client client that are leave the room
     * @param data infomation tha client send when he/she leave the room
     */
    @SubscribeMessage('leave')
    public async onRoomLeave(client, data: any): Promise<void> {
      client.leave(data[0]);
    }


  }