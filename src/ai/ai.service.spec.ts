import { AiService } from "./ai.service";

describe("AiService", () => {
  let service: AiService;

  beforeEach(() => {
    service = new AiService();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should calculate score and missing skills correctly", () => {
    const result = service.calculateMatchScore({
      jobTitle: "Backend Engineer",
      jobSkills: ["nestjs", "postgres", "jwt"],
      candidateSkills: ["nestjs", "jwt"],
    });

    expect(result.score).toBe(67);
    expect(result.matchedSkills).toEqual(["nestjs", "jwt"]);
    expect(result.missingSkills).toEqual(["postgres"]);
    expect(result.recommendation).toBe("Potential match");
  });
});
