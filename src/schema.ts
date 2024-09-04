import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./schema.graphql";

type Link = {
    id: string;
    url: string;
    description: string;
}

const links: Link[] = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

type User = {
    id: string;
    nome: string;
}

const users: User[] = [
    {id: 'user-0', nome: 'joao'},
    {id: 'user-1', nome: 'filipi'}  
];

type Categoria = {
    id:     string;
    nome:   string;
}

const categorias: Categoria[] = [
    {id: 'categoria-0', nome: 'arroz'}
]

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        users: () => users,
        categorias: () => categorias,
    },
    Link: {
        id: (parent: Link) => parent.id,
        description: (parent: Link) => parent.description,
        url: (parent: Link) => parent.url,
      },
    Categoria: {
        id: (parent: Categoria) => parent.id,
        nome: (parent: Categoria) => parent.nome,
    },
    Mutation: {
        createUser: (_: any, {nome}: {nome: string}) => {
            const newUser: User = {
                id: `user-${users.length}`,
                nome
            };
            users.push(newUser);
            return newUser;
        },
        createCategoria: (_: any, { nome }: { nome: string }) => {
            const newCategoria: Categoria = {
                id: `categoria-${categorias.length}`,
                nome
            };
            categorias.push(newCategoria);
            return newCategoria;
        }
    }
}

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});