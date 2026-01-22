import { Body, Controller, Post, Get, Patch, Param } from "@nestjs/common";
import { DocumentService } from "../services/documents.service"; 
import { DocumentStatus } from "../entities/document.entity";

@Controller('documents')
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}


    @Get('stats')
    async getStats(){
        return this.documentService.getStats();
    }

    @Post()
    create(@Body() createDocument: any){
        return this.documentService.create(createDocument);
    }

    @Get()
    findAll(){
        return this.documentService.findAll();
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() updateDocument: {status: DocumentStatus}){
        return this.documentService.update(+id, updateDocument);
    }
}