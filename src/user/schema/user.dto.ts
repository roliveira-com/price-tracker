import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty({ message: `O campo de mail é obrigatório` })
  @IsEmail({}, { message: `Digite um email válido` })
  email: string;

  @IsNotEmpty({ message: 'Digite seu nome completo' })
  nome: string;

  telefone: string;

  senha: string;
}