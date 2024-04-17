import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  Query,
  NotFoundException,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from 'src/minio/minio.service';
import { PostValidationPipe } from './pipes/postValidation.pipe';

const POSTS_LIMIT = 8;

@Controller('post')
export class PostController {
  constructor(private postService: PostService, private readonly minioService: MinioService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({transform: true}))
  @UseInterceptors(FileInterceptor('imagefile'))
  async CreatePost(@Body() body: CreatePostDto, @UploadedFile() imageFile) {
    await this.minioService.createBucketIfNotExists();
    const filename = await this.minioService.uploadFile(imageFile);

    return this.postService.createPost(body, filename);
  }


  // createPost(@Body() body: CreatePostDto) {
  //   return this.postService.createPost(body);
  // }

  @Get('getcount')
  getCount(){
    return this.postService.getCount();
  }


  @Get('getposts')
  readPost(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    const _limit = limit ? limit : POSTS_LIMIT;
    return this.postService.getPosts(_limit);
  }


  @Get('getone/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Get('getbyslug/:slug')
  fineOneBySlug(@Param('slug') slug: string){
    return this.postService.findOneBySlug(slug)
  }


  @Patch('updatepost/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<CreatePostDto>,
  ) {
    return this.postService.updatePost(id, body);
  }


  @Delete('deletepost/:id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }


  @Get('category/:categoryslug')
  async getPostsBySlug(@Param('categoryslug') categoryslug: string) {
    const posts = await this.postService.findPostsByCategoryName(categoryslug);
    if (!posts || posts.length === 0) {
      throw new NotFoundException(
        `No posts found in category '${categoryslug}'.`,
      );
    }
    return posts;
  }


  @Get('category')
  async getPostsByName(@Query('name') categoryname: string) {
    return this.postService.findPostByName(categoryname);
  }
}
