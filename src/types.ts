// deno-lint-ignore-file no-explicit-any
interface RyobiWebSocket<T> {
  jsonrpc: "2.0";
  method: string;
  params: T;
}
export type RyobiRequest = RyobiWebSocket<Record<string, unknown>>;
export type RyobiResponse = RyobiWebSocket<Record<string, any>>;
export type AuthenticateResponse = RyobiWebSocket<{
  authorized: boolean;
  socketId: string;
}>;
export interface LoginResponse {
  result: {
    _id: string;
    varName: string;
    metaData: {
      companyName: string;
      surName: string;
      givenName: string;
      sys: {
        ip: string;
        lastSeen: number;
      };
      wskAuthAttempts: any[];
      authCount: number;
      userName: string;
    };
    accountOptions: {
      email: string;
      alertPhone: string;
      alertEmail: string;
      receiveEmailUpdates: boolean;
      receiveEmailAlerts: boolean;
      receiveSmsAlerts: boolean;
      receiveProductInfo: boolean;
      homeDepotPromotions: boolean;
      productResearchInvitations: boolean;
    };
    enabled: boolean;
    deleted: boolean;
    createdDate: string;
    activated: number;
    notificationTransports: any[];
    auth: {
      apiKey: string;
      regPin: string;
      clientUserName: string;
      createdDate: string;
      childSelectors: string[];
      roleMap: {
        roleSelectors: any[];
        roleRegex: any[];
        roleNames: any[];
      };
      roleIds: string[];
      clientSchema: string;
    };
  };
}
export interface DeviceIdResponse {
  result: {
    _id: string;
    varName: string;
    metaData: {
      name: string;
      version: number;
      icon: string;
      description: string;
      wskAuthAttempts: any[];
      authCount: number;
      sys: {
        ip: string;
        lastSeen: number;
      };
      socketId: string;
    };
    enabled: boolean;
    deleted: boolean;
    createdDate: string;
    activated: number;
    deviceTypeIds: string[];
    deviceTypeMap: Record<string, any>;
    activatedDate: string;
  };
}
