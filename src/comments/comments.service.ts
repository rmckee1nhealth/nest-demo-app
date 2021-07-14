import { Injectable } from '@nestjs/common';
import { Prisma, Comment } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.CommentCreateInput, post_id: number): Promise<Comment> {
    const post = this.prisma.post.findUnique({ where: { id: post_id } });
    return this.prisma.comment.create({
      data: {
        body: data.body,
        post: {
          connect: {
            id: post_id
          }
        }
      }
    });
  }

  async findOne(commentWhereUniqueInput: Prisma.CommentWhereUniqueInput): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where: commentWhereUniqueInput,
    });
  }

  async findAll() {
    return this.prisma.comment.findMany();
  }

  async update(params: {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.CommentUpdateInput;
  }, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const { data, where } = params;
    return this.prisma.comment.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
    return this.prisma.comment.delete({
      where,
    });
  }
}
