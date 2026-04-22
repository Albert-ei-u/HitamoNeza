import { Test, TestingModule, } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { before, beforeEach, describe, } from 'node:test';
import passport from 'passport';
import { create } from 'domain';


describe('UsersService', () => {
  let service: UsersService;
  let repo: {
    findOne: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
  };

  beforeEach(async() => {
    const repoMock = { 
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User),  useValue: repoMock},
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createUser should return a safe user without password', async () => {
    const dto = {name: 'Albert', email: 'albert@example.com', password: '123456'};

    repo.findOne.mockResolvedValue('hashed-pass' as never);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-pass' as never);

    repo.create.mockReturnValue({
      name:dto.name,
      email: dto.email,
      password: 'hashed-pass',
    });

    repo.save.mockResolvedValue({
      id: 1,
      name: dto.name,
      email: dto.email,
      password: 'hashed-pass',
      createdAt: new Date(),
    })
    const result = await service.createUser(dto);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('email', dto.email);
    expect(result).not.toHaveProperty('password');
  })

  it('createUser should throw if email already exists', async () => {
    repo.findOne.mockResolvedValue({ id: 1, email: 'albert@example.com'});

    await expect(
      service.createUser({ name: 'Albert', email:'albert@example', password: '123456'})
    ).rejects.toThrow(ConflictException);
  });
});