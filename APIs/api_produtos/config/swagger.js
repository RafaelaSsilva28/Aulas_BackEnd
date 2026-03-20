 //Esse tipo de documento consegue documentar a nossa API
//Além de servir como uma ferramenta para a gente testar
//Ele não é nossa API - nós ainda precisamos montar as rotas e tudo

const documentacao = {
    openapi: '3.0.3',

    info: {
        title: '🛍️ API de Produtos 🛍️',
        description: 'Documentação da API de Produtos',
        version: '1.0.0'
    },

    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Localhost'
        }
    ],

    tags: [
        { name: "Produtos", description: "Operações relacionadas aos produtos" },
        
    ],

    paths: {

        "/produtos": {
            get: {
                tags: ["Produtos"],
                summary: "Listar Produtos",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Lista_Produtos" }
                                }
                            }
                        }
                    }
                }
            },

            post: {
                tags: ["Produtos"],
                summary: "Cadastrar novo produtos",
                description: "Recebe nome_produto, preco, link_imagem, link_produto, frete_gratis",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastro_Produtos"
                            }
                        }
                    }
                },
                responses: {
                    201: { description: "Produto cadastrado com sucesso" },
                    400: { description: "Erro na requisição" },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        "/produtos/{id_produto}": {  //acessando a rota passando o parametro e receendo os metodos
            put: {
                tags: ["Produtos"],
                summary: "Atualizar produto completo",

                parameters: [
                    {
                        name: "id_produto",
                        in: "path",
                        required: true,
                        description: "ID do produto",
                        schema: { type: "integer" },
                        example: 1
                    }
                ],

                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Atualizacao_Produto"
                            }
                        }
                    }
                },

                responses: {
                    200: { description: "Produto atualizado" },
                    404: { description: "Produto não encontrado" },
                    500: { description: "Erro no servidor" }
                }
            },
            patch: {
                tags: ["Produtos"],
                summary: "Atualizar parcialmente o produto",
                description: `Atualiza apenas os campos enviados, não sendo necessarios enviar todos os campos`,
                parameters: [
                    {
                        name: "id_produto",
                        in: "path",
                        required: true,
                        description: "ID do produto",
                        schema: { type: "integer" },
                        example: 1
                    }
                ],

                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Atualizacao_Parcial_Produto"
                            },
                            examples: {
                                apenas_nome_produto: {summary: "Atualizar apenas o nome_produto", value: {nome_produto: "Novo Nome"}},
                                apenas_preco: {summary: "Atualizar apenas o preco", value: {preco: 3121}},
                                apenas_link_imagem: {summary: "Atualizar apenas o link da imagem", value: {link_imagem: "novo link de imagem"}},
                                apenas_link_produto: {summary: "Atualizar apenas o link do produto", value: {link_produto: "novo link do produto"}},
                                apenas_frete_gratis: {summary: "Atualizar apenas o frete gratis", value: {frete_gratis: true}},
                            }
                        }
                    }
                },

                responses: {
                    200: { description: "Produto atualizado" },
                    400: {description: "Nenhum campo a ser atualizado"},
                    404: { description: "Produto não encontrado" },
                    500: { description: "Erro no servidor" }
                }
            },
            delete: {
                tags: ["Produtos"],
                summary: "Remover o produto",
                description: `O delete vai remover o produto`,
                parameters: [
                    {
                        name: "id_produto",
                        in: "path",
                        required: true,
                        description: "ID do produto a ser removido",
                        schema: { type: "integer" },
                        example: 1
                    }
                ],
                responses: {
                    200: { description: "Produto removido" },
                    500: { description: "Erro no servidor" }
                }
            }
        }
    },

    components: {

        schemas: {

            Lista_Produtos: {
                type: "object",
                properties: {
                    id_produto: { type: "integer", example: 1 },
                    nome_produto: { type: "string", example: "Unicornio" },
                    preco: { type: "number", format: "float", example: 3443.43 },
                    link_imagem: { type: "string", example: "https://imagem.com/img.jpg"},
                    link_produto: { type: "string", example: "https://loja.com/produto"},
                    frete_gratis: { type: "boolean", example: false}
                }
            },

            Cadastro_Produtos: {
                type: "object",
                properties: {
                    nome_produto: { type: "string", example: "Celular" },
                    preco: { type: "number", format: "float", example: 43.43 },
                    link_imagem: { type: "string", example: "https://imagem.com/img.jpg"},
                    link_produto: { type: "string", example: "https://loja.com/produto"},
                    frete_gratis: { type: "boolean", example: false}
                }
            },

            Atualizacao_Produto: {
                type: "object",
                required: ["nome_produto", "preco", "link_imagem", "link_produto", "frete_gratis"],
                properties: {
                    nome_produto: { type: "string" },
                    preco: { type: "number", format: "float" },
                    link_imagem: { type: "string" },
                    link_produto: { type: "string" },
                    frete_gratis: { type: "boolean" }
                }
            },

            Atualizacao_Parcial_Produto: {
                type: "object",
                properties: {
                    nome_produto: { type: "string" },
                    preco: { type: "number", format: "float" },
                    link_imagem: { type: "string" },
                    link_produto: { type: "string" },
                    frete_gratis: { type: "boolean" }
                }
            }
        },
    }

}

export default documentacao;