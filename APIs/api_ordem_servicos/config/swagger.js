//Esse tipo de documento consegue documentar a nossa API
//Além de servir como uma ferramenta para a gente testar
//Ele não é nossa API - nós ainda precisamos montar as rotas e tudo  - dependente da API

const documentacao = {
    openapi: `3.0.3`,
    info: {
        title: `API Ordens de Serviços`,
        description: `Documentação da API de Ordens de Serviços`,
        version: `1.0.0`
    }, //conseguimos colocar quantos servidores a gente quer aqui 
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Localhost'
        }
    ],
    tags: [ //cada separação que temos ele vai para um local especifico 
        { name: "Usuários", description: "Operações relacionadas aos usuários" },
        {name: "Departamentos", description: "Operações relacionadas a departamentos"},
        {name: "Ordem de Serviços", description: "Operações relacionadas a ordem de serviços"}
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
                            "apllication/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Lista_Usuarios" } //aqui é como se fosse uma ancoragem 
                                }
                            }
                        }
                    },
                    "/departamentos":{
                        get: {
                            tags: ["Departamentos"],
                            summary: "Lista dos Departamentos",
                            response: {
                                200: {
                                    description: "Dados obtidos com sucesso!",
                                    content: {
                                        "apllication/json": {
                                            schema: {
                                                type: "array",
                                                items: { $ref: "#/components/schemas/Lista_Departamentos"}
                                            }
                                        }
                                    }
                                },
                                "/ordem_servicos":{
                                    get: {
                                        tags: ["Ordem de Serviços"],
                                        summary: "Ordem de Serviços",
                                        response: {
                                            200: {
                                                description: "Dados obtidos com sucesso!",
                                                content: {
                                                    "apllication/json":  {
                                                        schema: {
                                                            type: "array",
                                                            items: { $ref: "#/components/schemas/Ordem_Servicos"}
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
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
                    nome: {type: "string", example: "Ricardo"},
                    email: {type: "string", example: "ricardo@email.com"}
                }
            },
            Lista_Departamento: {
                type: "object",
                properties: {
                    id: { type: "interger", example: 1 },
                    nome: { type: "string", example: "sala 02" },
                    descricao: { type: "string", example: "perto da porta de saida dos fundos do outro bloco" }
                }
            },
            Ordem_Servicos: {
                type: "object",
                properties: {
                    id: {  type: "interger", example: 1 },
                    numero_ordem: { type: "interger", example: 1 },
                    titulo: { type: "string", example: "cadeira" },
                    descricao: { type: "string", example: "sem a perna" },
                    prioridade: { type: "string", example: "alta" },
                    status: { type: "string", example: "em andamento" },
                }
            }
        }
    }

}


export default documentacao