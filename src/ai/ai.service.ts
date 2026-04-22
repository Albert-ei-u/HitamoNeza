import { Injectable } from "@nestjs/common";
import { MatchScoreDto } from "./dto/match-score.dto";

@Injectable()
export class AiService {
  private normalizeSkills(skills: string[]): string[] {
    return skills.map((skill) => skill.trim().toLowerCase()).filter(Boolean);
  }

  calculateMatchScore(input: MatchScoreDto) {
    const required = this.normalizeSkills(input.jobSkills);
    const candidate = new Set(this.normalizeSkills(input.candidateSkills));

    const matchedSkills = required.filter((skill) => candidate.has(skill));
    const missingSkills = required.filter((skill) => !candidate.has(skill));
    const baseScore = (matchedSkills.length / required.length) * 100;
    const score = Math.round(baseScore);

    const recommendation =
      score >= 80
        ? "Strong match"
        : score >= 60
          ? "Potential match"
          : "Weak match";

    return {
      score,
      matchedSkills,
      missingSkills,
      recommendation,
      generatedAt: new Date().toISOString(),
    };
  }
}
