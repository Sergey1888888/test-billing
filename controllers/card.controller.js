const db = require("../models");
const Card = db.card;

exports.create = (req, res) => {
    if (!req.body.CardNumber || !req.body.ExpDate || !req.body.Cvv || !req.body.Amount) {
        res.status(400).send({ message: "Неправильные данные!" });
        return;
    }

    const card = new Card({
        CardNumber: req.body.CardNumber,
        ExpDate: req.body.ExpDate,
        Cvv: req.body.Cvv,
        Amount: req.body.Amount
    });

    card
        .save(card)
        .then(data => {
            res.send({RequestId: data.id, Amount: data.Amount});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ошибка при создании новой записи."
            });
        });
};