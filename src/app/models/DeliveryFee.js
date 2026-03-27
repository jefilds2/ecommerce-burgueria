import { Model, DataTypes } from 'sequelize';

class DeliveryFee extends Model {
    static init(sequelize) {
        super.init(
            {
                value: DataTypes.DECIMAL(10, 2),
            },
            {
                sequelize,
                tableName: 'delivery_fees',
                timestamps: true,
                underscored: true,
            }
        );

        return this;
    }
}

export default DeliveryFee;