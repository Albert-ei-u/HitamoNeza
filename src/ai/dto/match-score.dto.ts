import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";

export class MatchScoreDto {
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsString()
  jobDescription?: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  jobSkills: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  candidateSkills: string[];
}
