import { Length, IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { DoesEmailAlreadyExist } from './DoesEmailAlreadyExist';
import { PasswordInput } from '../../shared/PasswordInput';

@InputType()
export class RegisterInput extends PasswordInput {

    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    @DoesEmailAlreadyExist({ message: 'Email is already in use.'})
    email: string;
}