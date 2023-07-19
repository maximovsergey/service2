import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { InjectClient } from 'nest-postgres';

export type Product = {
  id: number;
  name: string;
};

@Injectable()
export class ProductService {
  constructor(@InjectClient() private readonly postgres: Client) {}

  public async getAllProducts(): Promise<Product[]> {
    const products = await this.postgres.query(
      'SELECT * FROM public."Product"',
    );
    const res: Product[] = products.rows.map((el) => {
      const t: Product = {
        id: el.id,
        name: el.name,
      };
      return t;
    });
    return res;
  }

  public async getOne(id: number): Promise<Product> {
    const products = await this.postgres.query(
      `SELECT * FROM public."Product" where id = '${id}'`,
    );
    const [user] = products.rows;
    if (user) {
      const { id: userId, name } = user;
      return { id: userId, name };
    }
    throw new Error('Не найден продукт');
  }

  public async create(name: string): Promise<Product | Error> {
    const temp = await this.postgres.query(`INSERT INTO public."Product"(
      name)
      VALUES ('${name}') RETURNING id, name`);
    const [user] = temp.rows;
    if (user) {
      const { id: userId, name } = user;
      return { id: userId, name };
    }
    return new Error('Не найден продукт');
  }

  public async update(data: Product): Promise<Product | Error> {
    const temp = await this.postgres.query(
      `update public."Product" set name = '${data.name}' where id = ${data.id} RETURNING id, name`,
    );
    const [user] = temp.rows;
    if (user) {
      const { id: userId, name } = user;
      return { id: userId, name };
    }
    return new Error('Не найден продукт');
  }

  public async delete(id: number): Promise<boolean> {
    const temp = await this.postgres.query(
      `delete from public."Product" where id = ${id}`,
    );
    return Boolean(temp.rowCount);
  }
}
