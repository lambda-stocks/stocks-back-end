import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import graphqlHTTP from 'express-graphql';

import rest from './rest';
import { schema } from './graphql/schema';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(morgan('dev'));

rest(app);
app.use('/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
export default app;