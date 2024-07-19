import { IsOptional } from "class-validator";

export class QueryGetTotalDto {

    @IsOptional()
    state: string = 'Registrado';
}
