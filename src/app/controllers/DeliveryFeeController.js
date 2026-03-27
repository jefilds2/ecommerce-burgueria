import DeliveryFee from '../models/DeliveryFee.js';

class DeliveryFeeController {
    async show(req, res) {
        try {
            const deliveryFee = await DeliveryFee.findByPk(1);

            if (!deliveryFee) {
                return res.status(404).json({
                    message: 'Taxa de entrega não encontrada',
                });
            }

            return res.status(200).json({
                id: deliveryFee.id,
                value: deliveryFee.value,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao buscar taxa de entrega',
                error: error.message,
            });
        }
    }

    async update(req, res) {
        try {
            const { value } = req.body;

            if (value === undefined || value === null || value === '') {
                return res.status(400).json({
                    message: 'O campo value é obrigatório',
                });
            }

            const numericValue = Number(value);

            if (Number.isNaN(numericValue)) {
                return res.status(400).json({
                    message: 'O campo value deve ser numérico',
                });
            }

            if (numericValue < 0) {
                return res.status(400).json({
                    message: 'A taxa de entrega não pode ser negativa',
                });
            }

            let deliveryFee = await DeliveryFee.findByPk(1);

            if (!deliveryFee) {
                deliveryFee = await DeliveryFee.create({
                    id: 1,
                    value: numericValue,
                });
            } else {
                deliveryFee.value = numericValue;
                await deliveryFee.save();
            }

            return res.status(200).json({
                message: 'Taxa de entrega atualizada com sucesso',
                deliveryFee: {
                    id: deliveryFee.id,
                    value: deliveryFee.value,
                },
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao atualizar taxa de entrega',
                error: error.message,
            });
        }
    }
}

export default new DeliveryFeeController();