import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//--------------------------------------------------------------------------------------------------------
// GET - listar produtos
router.get('/produtos', async (req, res) => {
    try {
        const query = `SELECT * FROM produtos ORDER BY id_produto`;
        const produtos = await BD.query(query);

        return res.status(200).json(produtos.rows);

    } catch (error) {
        console.log('Erro ao listar produtos', error.message);
        return res.status(500).json({ error: 'Erro ao listar produtos' });
    }
});

//--------------------------------------------------------------------------------------------------------
// POST - cadastrar produto
router.post('/produtos', async (req, res) => {
    const { nome_produto, preco, link_imagem, link_produto, frete_gratis } = req.body;

    try {
        const comando = `
            INSERT INTO produtos
            (nome_produto, preco, link_imagem, link_produto, frete_gratis)
            VALUES ($1, $2, $3, $4, $5)
        `;

        const valores = [nome_produto, preco, link_imagem, link_produto, frete_gratis];

        await BD.query(comando, valores);

        return res.status(201).json("Produto cadastrado com sucesso");

    } catch (error) {
        console.log('Erro ao cadastrar produto', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar produto' });
    }
});

//--------------------------------------------------------------------------------------------------------
// PUT - atualizar produto completo
router.put('/produtos/:id_produto', async (req, res) => {
    const { id_produto } = req.params;
    const { nome_produto, preco, link_imagem, link_produto, frete_gratis } = req.body;

    try {
        const verificar = await BD.query(
            `SELECT * FROM produtos WHERE id_produto = $1`,
            [id_produto]
        );

        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const comando = `
            UPDATE produtos 
            SET nome_produto = $1, preco = $2, link_imagem = $3, link_produto = $4, frete_gratis = $5
            WHERE id_produto = $6
        `;

        const valores = [nome_produto, preco, link_imagem, link_produto, frete_gratis, id_produto];

        await BD.query(comando, valores);

        return res.status(200).json('Produto atualizado com sucesso');

    } catch (error) {
        console.log('Erro ao atualizar produto', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
});

//--------------------------------------------------------------------------------------------------------
// PATCH - atualização parcial
router.patch('/produtos/:id_produto', async (req, res) => {
    const { id_produto } = req.params;
    const { nome_produto, preco, link_imagem, link_produto, frete_gratis } = req.body;

    try {
        const verificar = await BD.query(
            `SELECT * FROM produtos WHERE id_produto = $1`,
            [id_produto]
        );

        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome_produto !== undefined) {
            campos.push(`nome_produto = $${contador}`);
            valores.push(nome_produto);
            contador++;
        }

        if (preco !== undefined) {
            campos.push(`preco = $${contador}`);
            valores.push(preco);
            contador++;
        }

        if (link_imagem !== undefined) {
            campos.push(`link_imagem = $${contador}`);
            valores.push(link_imagem);
            contador++;
        }

        if (link_produto !== undefined) {
            campos.push(`link_produto = $${contador}`);
            valores.push(link_produto);
            contador++;
        }

        if (frete_gratis !== undefined) {
            campos.push(`frete_gratis = $${contador}`);
            valores.push(frete_gratis);
            contador++;
        }

        if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo para atualizar" });
        }

        valores.push(id_produto);

        const comando = `
            UPDATE produtos 
            SET ${campos.join(', ')} 
            WHERE id_produto = $${contador}
        `;

        await BD.query(comando, valores);

        return res.status(200).json('Produto atualizado com sucesso');

    } catch (error) {
        console.error('Erro ao atualizar produto', error.message);
        return res.status(500).json({ message: "Erro interno no servidor" });
    }
});

//--------------------------------------------------------------------------------------------------------
// DELETE - remover produto
router.delete('/produtos/:id_produto', async (req, res) => {
    const { id_produto } = req.params;

    try {
        const verificar = await BD.query(
            `SELECT * FROM produtos WHERE id_produto = $1`,
            [id_produto]
        );

        if (verificar.rows.length === 0) {
            return res.status(404).json({
                message: "Produto não encontrado"
            });
        }

        await BD.query(
            `DELETE FROM produtos WHERE id_produto = $1`,
            [id_produto]
        );

        return res.status(200).json({
            message: "Produto removido com sucesso"
        });

    } catch (error) {
        console.error('Erro ao deletar produto', error.message);

        return res.status(500).json({
            message: "Erro interno no servidor"
        });
    }
});

export default router;