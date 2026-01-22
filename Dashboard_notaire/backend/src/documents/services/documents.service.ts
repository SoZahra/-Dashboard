import { Body, Injectable, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Document } from "src/documents/entities/document.entity";
import { get } from "http";
import { Repository } from "typeorm";


@Injectable()
    export class DocumentService {
        constructor(
            @InjectRepository(Document)
            private readonly documentRepository: Repository<Document>,
        ) {}

    async getStats() {
        return await this.documentRepository
        .createQueryBuilder('document')
        .select('document.status', 'status')
        .addSelect('SUM(document.pageCount)', 'total_pages')
        .groupBy('document.status')
        .getRawMany(); 
        // On utilise getRawMany() car SUM() n'est pas une propriété directe de l'entité
  }

  create(data: any){
    return this.documentRepository.save(data)
  }

  findAll(){
    return this.documentRepository.find({
        order: { createdAt: 'DESC' }
    });
  }

  async update(id: number, data: any){
    await this.documentRepository.update(id, data);
    return this.documentRepository.findOneBy({id});
  }
    
}