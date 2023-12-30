import { DataTypes, Model, Sequelize } from 'sequelize';

export class Message extends Model {
  public text!: string;
  public timestamp!: number;
}

export function initializeMessageModel(sequelize: Sequelize): void {
  Message.init(
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'messages',
      sequelize,
    },
  );
}
