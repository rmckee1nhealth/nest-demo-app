import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('posts/:post_id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  create(
    @Body() data: CreateCommentDto,
    @Param('post_id') post_id: number
  ) {
    return this.commentsService.create(data, Number(post_id));
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentsService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(
      {
        where: {
          id: Number(id)
        },
        data: updateCommentDto
      },
      updateCommentDto);
  }

  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.commentsService.remove({ id: Number(id) });
  }
}