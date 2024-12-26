import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostReadLog } from './entities/post-read-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostReadLog])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
