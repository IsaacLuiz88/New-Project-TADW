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
    name: string;
}

const users: User[] = [
    {id: 'user-0', name: 'joao'},
    {id: 'user-1', name: 'filipi'}  
];

type Categoria = {
    id:     string;
    name:   string;
}

const categorias: Categoria[] = [
    {id: 'categoria-0', name: 'arroz'}
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
        name: (parent: Categoria) => parent.name,
    },
    Mutation: {
        createUser: (_: any, {name}: {name: string}) => {
            const newUser: User = {
                id: `user-${users.length}`,
                name
            };
            users.push(newUser);
            return newUser;
        },
        createCategoria: (_: any, { name }: { name: string }) => {
            const newCategoria: Categoria = {
                id: `categoria-${categorias.length}`,
                name
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