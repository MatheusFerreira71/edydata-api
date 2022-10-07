import { Parser } from 'xml2js';
import fs from 'fs';
import path from 'path';
import { DOMParser } from 'xmldom';
import IStorageProvider from '../../../shared/providers/storageProvider/model/IStorageProvider';
import IClientRepository from '../repositories/IClientRepository';
import AppError from '../../../shared/errors/AppError';
import ICreateClientDTO from '../dtos/ICreateClientDTO';
import IXMLBodyDTO from '../dtos/IXMLBodyDTO';

export default class ImportClientDataService {
  constructor(
    private clientRepo: IClientRepository,
    private storageProvider: IStorageProvider,
  ) {
    this.clientRepo = clientRepo;
    this.storageProvider = storageProvider;
  }

  public async execute(dataFilename: string): Promise<number> {
    const parser = new Parser({
      attrkey: 'ATTR',
      explicitArray: false,
      mergeAttrs: true,
    });

    const filename = await this.storageProvider.saveFile(dataFilename);

    const xmlFile = fs.readFileSync(
      path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'tmp',
        'uploads',
        filename,
      ),
      'utf8',
    );

    const replacedXmlFile = xmlFile.replace(/Nº/g, 'N');

    const parsedXml = new DOMParser().parseFromString(
      replacedXmlFile,
      'text/xml',
    );

    const clients: ICreateClientDTO[] = [];

    parser.parseString(parsedXml, (error, result: IXMLBodyDTO) => {
      if (error) {
        throw new AppError(`Falha no XML: ${error.message}`);
      }

      result.registros.item.forEach(item => {
        const date = item.Datadenascimento
          ? item.Datadenascimento.split(' ')[0].split('/')
          : undefined;
        clients.push({
          nome: item.Nome,
          CPF: item.CPF,
          estadoCivil: item.EstadoCivil,
          pai: item.Pai || undefined,
          mae: item.Mae || undefined,
          conjuge: item.Conjuge || undefined,
          rg: item.RG || undefined,
          salario: Number(item.Salario.replace('.', '').replace(',', '.')),
          especie: item.Especie,
          tituloEleitor: item.TitulodeEleitor || undefined,
          sexo: item.Sexo,
          celular: item.Celular || undefined,
          cep: item.CEP || undefined,
          endereco: item.Endereco || undefined,
          email: item.Email || undefined,
          cidade: item.Cidade || undefined,
          dataNascimento: date
            ? new Date(`${date[2]}-${date[1]}-${date[0]}`)
            : date,
        });
      });
    });

    const importedClientsPromise = this.clientRepo.importData(clients);

    const deleteFilePromise = this.storageProvider.deleteFile(filename);

    const responses = await Promise.all([
      importedClientsPromise,
      deleteFilePromise,
    ]);

    return responses[0];
  }
}
