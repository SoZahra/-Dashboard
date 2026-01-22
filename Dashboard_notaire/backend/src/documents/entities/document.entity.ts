import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum DocumentStatus {
    PENDING = "PENDING",
    PROCESSED = "PROCESSED",
    ARCHIVED = "ARCHIVED"
}

@Entity()
export class Document {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fileName: string;

    @Column({ 
        type: 'simple-enum',
        enum: DocumentStatus,
        default: DocumentStatus.PENDING
    
    })
    status: DocumentStatus;

    @Column('int')
    pageCount: number;

    @Column('simple-json', { nullable: true })
    metadata: Record<string, any>; 

    @CreateDateColumn()
    createdAt: Date;
}