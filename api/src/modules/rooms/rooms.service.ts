import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Room } from 'src/repositories/entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/repositories/entities/message.entity';
import { logger } from 'src/utils/logger/logger';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private repository: Repository<Room>

  ) {}

	public async getOne(filter: any): Promise<Room> {
		return this.repository.findOne(filter);
	}

	public async get(filter?: any): Promise<Room | Array<Room>> {
		return this.repository.find(filter);
	}

	public async save(object: any): Promise<Room | Array<Room>> {
		return this.repository.save(object);
	}

	public async delete(id: string | number): Promise<boolean> {
		return this.repository.delete(id).then((res) => Promise.resolve(true)).catch((rej) => Promise.reject(false));
	}

	public async update(object: any): Promise<any> {
		return this.repository.update(object.Id, object).then((res) => Promise.resolve(res.raw)).catch((rej) => Promise.reject(rej));
	}
	
	public async addMessage(messages: any): Promise<Message> {
		try {
			const room = await this.repository.findOne({where:{ RoomCode: messages.room }});
			if(!room.Messages){
				room.Messages = new Array<Message>();
			}
			const message = new Message();
			message.Message = messages.message;
			message.User = messages.userId;
			message.Created = new Date(messages.time);
			room.Messages.push(message);
			await this.repository.update(room.Id, room);
			return message;
		} catch (error) {
			logger.warn("room not found");
		}
	}

}
