import Paho from 'paho-mqtt';

class MqttService {
  private client: Paho.Client | null = null;
  
  private onStatusChange: ((status: string) => void) | null = null;
  private onConnectionChange: ((connected: boolean) => void) | null = null;

  private _host: string = '';
  private _port: number = 0;
  private _path: string = '';
  private _clientId: string = '';
  private _topicSub: string = '';

  private isExplicitDisconnect: boolean = false;
  private reconnectTimer: NodeJS.Timeout | number | null = null;

  connect(host: string, port: number, path: string, clientId: string, topicSub: string) {
    this._host = host;
    this._port = port;
    this._path = path;
    this._clientId = clientId;
    this._topicSub = topicSub;
    this.isExplicitDisconnect = false; 

    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);

    if (this.client && this.client.isConnected()) return;

    console.log(`Tentando conectar em ${host}...`);

    this.client = new Paho.Client(host, port, path, clientId);

    this.client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("Conexão Perdida:", responseObject.errorMessage);
        this.onConnectionChange?.(false);
        
        this.handleAutoReconnect();
      }
    };

    this.client.onMessageArrived = (message) => {
      this.onStatusChange?.(message.payloadString);
    };

    this.client.connect({
      onSuccess: () => {
        console.log("MQTT Conectado!");
        this.onConnectionChange?.(true);
        this.client?.subscribe(topicSub);
      },
      onFailure: (e) => {
        console.log("Falha na conexão inicial:", e);
        this.onConnectionChange?.(false);
        
        this.handleAutoReconnect();
      },
      useSSL: false,
      timeout: 3,
      keepAliveInterval: 60
    });
  }

  private handleAutoReconnect() {
    if (this.isExplicitDisconnect) return;

    console.log("Agendando reconexão em 5 segundos...");
    
    this.reconnectTimer = setTimeout(() => {
      console.log("Executando reconexão automática...");
      this.connect(
        this._host, 
        this._port, 
        this._path, 
        this._clientId, 
        this._topicSub
      );
    }, 5000); 
  }

  publish(topic: string, message: string) {
    if (this.client && this.client.isConnected()) {
      const msgObj = new Paho.Message(message);
      msgObj.destinationName = topic;
      this.client.send(msgObj);
    }
  }

  disconnect() {
    this.isExplicitDisconnect = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    
    if (this.client?.isConnected()) {
      try {
        this.client.disconnect();
      } catch (e) {
        console.log("Erro ao desconectar", e);
      }
    }
  }

  setCallbacks(onStatus: (s: string) => void, onConnection: (c: boolean) => void) {
    this.onStatusChange = onStatus;
    this.onConnectionChange = onConnection;
  }
}

const mqttService = new MqttService();
export default mqttService;