/* eslint-disable prettier/prettier */
import { IsBoolean, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(1)
    password: string;

    @IsString()
    @MinLength(1)
    fullName: string;

    @IsString()
    @MinLength(1)
    document: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    phoneNumber2: string;

    @IsString()
    sponsor: string;
}