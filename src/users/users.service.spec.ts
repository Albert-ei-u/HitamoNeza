import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repo: {
    findOne: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
  };

  beforeEach(async () => {
    const repoMock = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repoMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createUser should return safe user without password', async () => {
    const dto = { name: 'Albert', email: 'a@a.com', password: '123456' };

    repo.findOne.mockResolvedValue(null);
    repo.create.mockImplementation((data) => data);
    repo.save.mockImplementation(async (data) => ({
      id: 1,
      ...data,
      createdAt: new Date(),
    }));

    const result = await service.createUser(dto);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('email', dto.email);
    expect(result).not.toHaveProperty('password');
    expect(repo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: dto.name,
        email: dto.email,
      }),
    );
  });

  it('createUser should throw if email already exists', async () => {
    repo.findOne.mockResolvedValue({ id: 1, email: 'a@a.com' });

    await expect(
      service.createUser({ name: 'Albert', email: 'a@a.com', password: '123456' }),
    ).rejects.toThrow(ConflictException);
  });
});
