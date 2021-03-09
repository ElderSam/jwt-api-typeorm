import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, getRepository, Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { UserToInsert } from './../utils/UserInterface';

let repository: Repository<User>;

@Entity('users')
export default class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8); // encrypts the password
    }

    static async list() {
        repository = getRepository(User);

        return await repository.createQueryBuilder("users")
            .select([
                "id",
                "name",
                "email"
            ]) // without password
            .getRawMany();
    }

    static async findbyColumnValue(column: string, value: string) {
        repository = getRepository(User);

        return await repository.createQueryBuilder("users")
            .where(`LOWER(${column}) = LOWER(:value)`, { value })
            .getOne();
    }

    static async insert(user: UserToInsert) {
        repository = getRepository(User);

        const auxUser = repository.create(user); // save on Database
        return await repository.save(auxUser);
    }

    static async update(id: string, user: object) {
        repository = getRepository(User);

        repository.createQueryBuilder("users")
            .update(User)
            .set(user)
            .where("id = :id", { id })
            .execute();
    }

    static async delete(id: string) {
        repository = getRepository(User);

        return await repository.delete(id)
    }
}