export default interface ICreateStoreDTO {
  name: string;
  nuvemshop_store_id: number;
  nuvemshop_store_token: string;
  nuvemshop_script_id: number;
  nuvemshop_webhooks_id?: string;
  contact_email?: string;
  nuvemshop_email: string;
  nuvemshop_domain: string;
}
