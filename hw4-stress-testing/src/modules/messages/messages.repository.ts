import { Message } from './message.entity'
import { DataSource, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { CreateMessageDto } from './dtos/create-message.dto'

@Injectable()
export class MessagesRepository extends Repository<Message> {
	constructor(dataSource: DataSource) {
		super(Message, dataSource.createEntityManager())
	}

	async createOne(createDto: CreateMessageDto): Promise<Message> {
		const message = new Message({ text: createDto.text })
		return await this.save(message)
	}

	async findAll(limit = 100, offset = 0): Promise<Message[]> {
		return await this.createQueryBuilder().limit(limit).offset(offset).getMany()
	}
}
