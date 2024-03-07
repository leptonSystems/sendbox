import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table({
  tableName: 'contacts',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['contact_id'],
    },
    {
      fields: ['user_id'],
    },
    {
      fields: ['phone_number'],
    },
  ],
})
export class Contact extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  contact_id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  phone_number: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
