export type DoorStatus = 'OPEN' | 'CLOSE' | 'DISCONNECTED' | 'WAITING...' | 'ERROR';

export interface MqttConfig {
  host: string;
  port: number;
  path: string;
  clientId: string;
}

export interface SmartLockState {
  password: string;
  status: DoorStatus;
  isConnected: boolean;
  isConnecting: boolean;
}