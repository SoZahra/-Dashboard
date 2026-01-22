import { Module } from '@nestjs/common';
import { DocumentController } from 'src/documents/controllers/documents.controller';
import { DocumentService } from 'src/documents/services/documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/documents/entities/document.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true, // Charge automatiquement les entites
      synchronize: true, // Cree les tables automatiquement
    }),
    TypeOrmModule.forFeature([Document]), // injecter le repo dans le service 
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class AppModule {}
