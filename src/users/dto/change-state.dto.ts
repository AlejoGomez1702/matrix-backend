import { IsNotEmpty, IsPositive, Min } from "class-validator";


export class ChangeStateDto {

    @IsPositive()
    stateId: number;
}
