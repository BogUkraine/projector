import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateMessageDto } from './dtos/create-message.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from './message.entity'
import { MessagesRepository } from './messages.repository'

@Injectable()
export class MessagesService {
	constructor(
		@InjectRepository(MessagesRepository)
		private readonly repository: MessagesRepository,
	) {}

	async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
		return await this.repository.createOne(createMessageDto)
	}

	async getAllMessages(): Promise<Message[] | []> {
		const messageData = await this.repository.findAll()
		if (!messageData || messageData.length == 0) {
			throw new NotFoundException('Messages data not found!')
		}

		return messageData
	}

	async getMessage(messageId: string): Promise<Message> {
		const existingMessage = await this.repository.findOneBy({ id: +messageId })
		if (!existingMessage) {
			throw new NotFoundException(`Message #${messageId} not found`)
		}

		return existingMessage
	}

	async deleteMessage(messageId: string): Promise<void> {
		const deletedMessage = await this.repository.delete({ id: +messageId })
		if (!deletedMessage) {
			throw new NotFoundException(`Message #${messageId} not found`)
		}
	}
}
