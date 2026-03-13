//Esse tipo de documento consegue documentar a nossa API
//Além de servir como uma ferramenta para a gente testar
//Ele não é nossa API - nós ainda precisamos montar as rotas e tudo

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
            }
        },

        "/departamentos": {
            get: {
                tags: ["Departamentos"],
                summary: "Listar Departamentos",

                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Lista_Departamentos" }
                                }
                            }
                        }
                    }
                }
            },

            post: {
                tags: ["Departamentos"],
                summary: "Cadastrar novo departamento",

                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastro_Departamento"
                            }
                        }
                    }
                },

                responses: {
                    201: { description: "Departamento cadastrado" },
                    400: { description: "Erro na requisição" },
                    500: { description: "Erro no servidor" }
                }
            }
        },

        "/departamentos/{id_departamento}": {
            put: {
                tags: ["Departamentos"],
                summary: "Atualizar departamento",

                parameters: [
                    {
                        name: "id_departamento",
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
                                $ref: "#/components/schemas/Atualizacao_Departamento"
                            }
                        }
                    }
                },

                responses: {
                    200: { description: "Departamento atualizado" },
                    404: { description: "Departamento não encontrado" },
                    500: { description: "Erro no servidor" }
                }
            }
        },

        "/ordem_servicos": {
            get: {
                tags: ["Ordem_Servicos"],
                summary: "Listar ordens de serviço",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Lista_Ordem_Servicos" }
                                }
                            }
                        }
                    }
                }
            },

            post: {
                tags: ["Ordem_Servicos"],
                summary: "Cadastrar nova ordem de serviço",

                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastro_Ordem_Servicos"
                            }
                        }
                    }
                },

                responses: {
                    201: { description: "Ordem cadastrada com sucesso" },
                    400: { description: "Erro na requisição" },
                    500: { description: "Erro no servidor" }
                }
            }
        },

       "/ordem_servicos/{id_ordem}": {
  put: {
    tags: ["Ordem_Servicos"],
    summary: "Atualizar ordem de serviço",

    parameters: [
      {
        name: "id_ordem",
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
            $ref: "#/components/schemas/Atualizacao_Ordem_Servicos"
          }
        }
      }
    },

    responses: {
      200: { description: "Ordem atualizada" },
      404: { description: "Ordem não encontrada" },
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
                    id: { type: "integer", example: 1 },
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

            Lista_Departamentos: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Manutenção" },
                    descricao: { type: "string", example: "Setor de manutenção geral" }
                }
            },

            Cadastro_Departamento: {
                type: "object",
                properties: {
                    nome: { type: "string", example: "Manutenção" },
                    descricao: { type: "string", example: "Setor responsável por reparos" }
                }
            },

            Atualizacao_Departamento: {
                type: "object",
                required: ["nome", "descricao"],
                properties: {
                    nome: { type: "string", example: "CASA" },
                    descricao: { type: "string",example: "Setor responsável por reparos"  }
                }
            },

            Lista_Ordem_Servicos: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    titulo: { type: "string", example: "Troca de lâmpada" },
                    descricao: { type: "string", example: "Trocar lâmpada da sala 3" },
                    prioridade: { type: "string", example: "Alta" },
                    status: { type: "string", example: "Aberta" }
                }
            },

            Cadastro_Ordem_Servicos: {
                type: "object",
                properties: {
                    numero_ordem: { type: "integer", example: 2 },
                    titulo: { type: "string", example: "Troca de lâmpada" },
                    descricao: { type: "string", example: "Trocar luzz da sala 3" },
                    prioridade: { type: "string", example: "Alta" },
                    status: { type: "string", example: "Aberta" }
                }
            },
            Atualizacao_Ordem_Servicos: {
    type: "object",
    required: ["numero_ordem", "titulo", "descricao", "prioridade", "status", "id_usuario", "id_departamento"],
    properties: {
        numero_ordem: { type: "integer", example: 3 },
        titulo: { type: "string", example: "Troca de casa" },
        descricao: { type: "string", example: "Trocar casa da sala 3" },
        prioridade: { type: "string", example: "Alta" },
        status: { type: "string", example: "Aberta" },
        id_usuario: { type: "integer", example: 1 },
        id_departamento: { type: "integer", example: 1 }
    }
}

        }
    }
}

export default documentacao