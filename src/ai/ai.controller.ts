import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt/jwt.guard";
import { AiService } from "./ai.service";
import { MatchScoreDto } from "./dto/match-score.dto";

@Controller("ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @Post("match")
  matchCandidateToJob(
    @Req() req: Request & { user: { userId: number; email: string } },
    @Body() dto: MatchScoreDto,
  ) {
    return {
      user: req.user,
      result: this.aiService.calculateMatchScore(dto),
    };
  }
}
