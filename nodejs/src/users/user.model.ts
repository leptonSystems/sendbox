// user.model.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id'],
    },
  ],
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password_hash: string;
}
