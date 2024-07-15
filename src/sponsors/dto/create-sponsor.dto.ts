import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSponsorDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(150)
    name!: string;

}
