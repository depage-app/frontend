import { type Locale } from "~/lib/translations";

declare global {
  type PageProps<P = object> = {
    params: {
      locale: Locale;
    } & P;
  };

  type Page<P = object> = (
    props: PageProps<P>
  ) => JSX.Element | Promise<JSX.Element>;

  type PropsWithChildren<P = unknown> = P & { children?: ReactNode };
  type PropsWithClassName<P = unknown> = P & { className?: string };
  type PropsWithChildrenAndClassName<P = unknown> = PropsWithClassName<P> &
    PropsWithChildren<P>;

  type ConfigData = {
    [functionName: string]: {
      id: string;
      visible: boolean;
      fields: {
        [fieldName: string]: {
          key: string;
          name: string;
          description: string;
          visible: boolean;
          value: string;
          multiplierId: string;
        };
      };
    };
  };

  type ContractFunction = {
    id: string;
    name: string;
    description: string | null;
    hidden: boolean;
    inputs: {
      id: string;
      name: string;
      description: string | null;
      type: string;
      hidden: boolean;
      value: string;
      multiply_by: string;
    }[];
  };

  type PageData = {
    id: string;
    name: string | null;
    description: string | null;
    config: ContractFunction[];
    contract_address: string;
    chain_id: number;
    abi: any;
  };

  type Network = {
    id: string;
    name: string;
    disabled: boolean;
  };
}
