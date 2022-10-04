import morgan from 'morgan';
import { Request } from 'express';

export default function morganConfig(): void {
  morgan.token(
    'req-body',
    (req: Request) => `Body: ${JSON.stringify(req.body)}`,
  );

  morgan.format('eva-log-format', `:req-body`);
}
