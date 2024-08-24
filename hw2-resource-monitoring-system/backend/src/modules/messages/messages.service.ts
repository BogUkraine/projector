import { Injectable, NotFoundException } from "@nestjs/common";
import { IMessage } from "./message.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateMessageDto } from "./dtos/create-message.dto";
import { UpdateMessageDto } from "./dtos/update-message.dto";
import { Message } from "./message.schema";
import MessagesSearchService from "../search/message-search.service";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<IMessage>,
    private messageSearchService: MessagesSearchService,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<IMessage> {
    const newMessage = await new this.messageModel(createMessageDto);
    const data = await newMessage.save();

    try {
      await this.messageSearchService.indexMessage(data);
    } catch (err) {
      console.log(err);
    }

    return data;
  }

  async updateMessage(
    messageId: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<IMessage> {
    const existingMessage = await this.messageModel.findByIdAndUpdate(
      messageId,
      updateMessageDto,
      { new: true },
    );
    if (!existingMessage) {
      throw new NotFoundException(`Message #${messageId} not found`);
    }

    return existingMessage;
  }

  async getAllMessages(): Promise<IMessage[]> {
    const messageData = await this.messageModel.find();
    if (!messageData || messageData.length == 0) {
      throw new NotFoundException("Messages data not found!");
    }

    return messageData;
  }

  async getMessage(messageId: string): Promise<IMessage> {
    const existingMessage = await this.messageModel.findById(messageId).exec();
    if (!existingMessage) {
      throw new NotFoundException(`Message #${messageId} not found`);
    }

    return existingMessage;
  }

  async deleteMessage(messageId: string): Promise<IMessage> {
    const deletedMessage = await this.messageModel.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      throw new NotFoundException(`Message #${messageId} not found`);
    }

    return deletedMessage;
  }

  async searchMessages(text: string): Promise<any> {
    const results = await this.messageSearchService.search(text);
    const ids = results.map((result) => result.message_id);
    if (!ids.length) {
      return [];
    }

    return await this.messageModel.find().where("_id").in(ids);
  }
}
