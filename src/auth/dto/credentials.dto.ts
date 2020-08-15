import { Length } from 'class-validator';

export class CredentialsDTO {
  @Length(3, 20)
  name: string;

  @Length(6, 20)
  password: string;
}
