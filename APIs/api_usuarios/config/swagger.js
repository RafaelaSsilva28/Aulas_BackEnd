const documentacao = {
    openapi: '3.0.3',

    info: {
        title: 'API Ordens de Serviços',
        description: 'Documentação da API de Ordens de Serviços',
        version: '1.0.0'
    },

    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Localhost'
        }
    ],

    tags: [
        { name: "Usuários", description: "Operações relacionadas aos usuários" },
        { name: "Departamentos", description: "Operações relacionadas a departamentos" },
        { name: "Ordem_Servicos", description: "Operações relacionadas às ordens de serviço" }
    ],

    paths: {

        "/usuarios": {
            get: {
                tags: ["Usuários"],
                summary: "Listar Usuários",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Lista_Usuarios" }
                                }
                            }
                        }
                    }
                }
            },

            post: {
                tags: ["Usuários"],
                summary: "Cadastrar novo usuário",
                description: "Recebe nome, email e senha",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastro_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    201: { description: "Usuário cadastrado com sucesso" },
                    400: { description: "Erro na requisição" },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        "/usuarios/{id_usuario}": {
            put: {
                tags: ["Usuários"],
                summary: "Atualizar usuário completo",

                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do usuário",
                        schema: { type: "integer" },
                        example: 1
                    }
                ],

                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Atualizacao_Usuario"
                            }
                        }
                    }
                },

                responses: {
                    200: { description: "Usuário atualizado" },
                    404: { description: "Usuário não encontrado" },
                    500: { description: "Erro no servidor" }
                }
            },

            patch: {
                tags: ["Usuários"],
                summary: "Atualizar parcialmente o usuario",
                description: `Atualiza apenas os campos enviados`,

                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        example: 1
                    }
                ],

                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Atualizacao_Parcial_Usuario"
                            },
                            examples: {
                                apenas_nome: {
                                    summary: "Atualizar nome",
                                    value: { nome: "Novo Nome" }
                                },
                                apenas_email: {
                                    summary: "Atualizar email",
                                    value: { email: "novo@email.com" }
                                }
                            }
                        }
                    }
                },

                responses: {
                    200: { description: "Usuário atualizado" },
                    400: { description: "Nenhum campo a ser atualizado" },
                    404: { description: "Usuário não encontrado" },
                    500: { description: "Erro no servidor" }
                }
            },

            delete: {
                tags: ["Usuários"],
                summary: "Remover o usuario",
                description: `O delete vai remover o usuario`,

                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        example: 1
                    }
                ],

                responses: {
                    200: { description: "Usuário removido" },
                    500: { description: "Erro no servidor" }
                }
            }
        }
    },

    components: {

        schemas: {

            Lista_Usuarios: {
                type: "object",
                properties: {
                    id_usuario: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Ricardo" },
                    email: { type: "string", example: "ricardo@email.com" }
                }
            },

            Cadastro_Usuario: {
                type: "object",
                properties: {
                    nome: { type: "string", example: "Ricardo" },
                    email: { type: "string", example: "ricardo@email.com" },
                    senha: { type: "string", example: "senha123" }
                }
            },

            Atualizacao_Usuario: {
                type: "object",
                required: ["nome", "email", "senha"],
                properties: {
                    nome: { type: "string" },
                    email: { type: "string" },
                    senha: { type: "string" }
                }
            },

            Atualizacao_Parcial_Usuario: {
                type: "object",
                properties: {
                    nome: { type: "string" },
                    email: { type: "string" },
                    senha: { type: "string" }
                }
            }

        }
    }

}

export default documentacao;