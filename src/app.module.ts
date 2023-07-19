import { ProductController } from './product/product.controller';
import { Module } from '@nestjs/common';
import { PostgresModule } from 'nest-postgres';
import { ProductService } from './product/product.service';

@Module({
  imports: [
    PostgresModule.forRoot({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '1qazZAQ!',
      database: 'NEST',
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
