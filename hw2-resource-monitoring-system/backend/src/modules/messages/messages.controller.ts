import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dtos/create-message.dto";
import { UpdateMessageDto } from "./dtos/update-message.dto";

@Controller("/messages")
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Post()
  async createMessage(
    @Res() response,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    try {
      const newMessage =
        await this.messageService.createMessage(createMessageDto);

      return response.status(HttpStatus.CREATED).json({
        message: "Message has been created successfully",
        newMessage,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "Error: Message not created!",
        error: "Bad Request",
      });
    }
  }

  @Put("/:id")
  async updateMessage(
    @Res() response,
    @Param("id") messageId: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    try {
      const existingMessage = await this.messageService.updateMessage(
        messageId,
        updateMessageDto,
      );

      return response.status(HttpStatus.OK).json({
        message: "Message has been successfully updated",
        existingMessage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getMessages(@Res() response) {
    try {
      const messageData = await this.messageService.getAllMessages();

      return response.status(HttpStatus.OK).json({
        message: "All messages data found successfully",
        messageData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get("/search")
  async searchMessages(@Res() response, @Query("search") search: string) {
    try {
      const messageData = await this.messageService.searchMessages(search);

      return response.status(HttpStatus.OK).json({
        message: "All messages data found successfully",
        messageData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get("/:id")
  async getMessage(@Res() response, @Param("id") messageId: string) {
    try {
      const existingMessage = await this.messageService.getMessage(messageId);

      return response.status(HttpStatus.OK).json({
        message: "Message found successfully",
        existingMessage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete("/:id")
  async deleteMessage(@Res() response, @Param("id") messageId: string) {
    try {
      const deletedMessage = await this.messageService.deleteMessage(messageId);

      return response.status(HttpStatus.OK).json({
        message: "Message deleted successfully",
        deletedMessage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
