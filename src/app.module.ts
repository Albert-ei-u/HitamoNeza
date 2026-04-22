import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { AiModule } from "./ai/ai.module";

function toBoolean(value: string): boolean {
  return value.toLowerCase() === "true";
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.getOrThrow<string>("DB_HOST"),
        port: Number.parseInt(config.getOrThrow<string>("DB_PORT"), 10),
        username: config.getOrThrow<string>("DB_USER"),
        password: config.getOrThrow<string>("DB_PASSWORD"),
        database: config.getOrThrow<string>("DB_NAME"),
        autoLoadEntities: true,
        synchronize: toBoolean(config.get<string>("DB_SYNC", "false")),
      }),
    }),
    UsersModule,
    AuthModule,
    AiModule,
  ],
})

export class AppModule {}
