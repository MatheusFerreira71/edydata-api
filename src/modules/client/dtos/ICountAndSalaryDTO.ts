import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import IGroupFilterKeys from '../keys/IGroupFilterKeys';

type ICountAndSalaryDTO = (Prisma.PickArray<
  Prisma.ClientGroupByOutputType,
  IGroupFilterKeys[]
> & {
  _sum: {
    salario: Decimal | null;
  };
  _count: {
    id: number;
  };
})[];

export default ICountAndSalaryDTO;
