import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    private toSafeUser(user: User) {
        const { password, ...safeUser } = user;
        return safeUser;
    }

    async createUser(dto: CreateUserDto) {
        const existingUser = await this.userRepo.findOne({
            where: { email: dto.email},
        });

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }
        
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = this.userRepo.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
        });
        const savedUser = await this.userRepo.save(user);
        return this.toSafeUser(savedUser);
    }

    async findByEmail(email: string){
        return this.userRepo.findOne({ where: { email}})
    }
}
