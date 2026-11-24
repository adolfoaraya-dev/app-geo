
import { Injectable, signal } from '@angular/core';
import BackgroundGeolocation from '@transistorsoft/capacitor-background-geolocation';

export interface UsuarioGeo {
  idUsuario: string;
  idPersonal: number;
  uuidMovil: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackgroundGeolocationService {

  tracking = signal(false);
  lastLocation = signal('');

  private initialized = false;

  async initialize(
    usuario: UsuarioGeo,
    urlbase: string
  ): Promise<void> {

  const config = {
    reset: true,
    geolocation: {
      desiredAccuracy: BackgroundGeolocation.DesiredAccuracy.High,
      distanceFilter: 0,
      locationUpdateInterval: 20 * 1000,
      fastestLocationUpdateInterval: 20 * 1000,
      allowIdenticalLocations: true,
      locationAuthorizationRequest: 'Always' as const,
    },
    activity: {
      disableStopDetection: true
    },
    app: {
      stopOnTerminate: false,
      startOnBoot: false,

      backgroundPermissionRationale: {
        title: 'Permitir ubicación en segundo plano',
        message: 'La aplicación necesita acceder a la ubicación aunque no esté abierta.',
        positiveAction: 'Configurar permiso',
        negativeAction: 'Cancelar'
      },

      notification: {
        title: 'Seguimiento GPS',
        text: 'La aplicación está registrando tu ubicación',
        channelName: 'Seguimiento GPS',
        sticky: true,
        priority: BackgroundGeolocation.NotificationPriority.High
      }
    },

    http: {
      url: `${urlbase}/seguimiento`,
      method: 'POST' as const,
      autoSync: true,
      batchSync: true,
      headers: {
        'Content-Type': 'application/json'
      }
    },

    persistence: {
        timestampFormat: 'epoch' as const,
        locationTemplate: `{
          "provider": "app-geo",
          "latitude": "<%= latitude %>",
          "longitude": "<%= longitude %>",
          "accuracy": "<%= accuracy %>",
          "speed": "<%= speed %>",
          "time": "<%= timestamp %>",
          "idUsuario": "${usuario.idUsuario}",
          "idPersonal": "${usuario.idPersonal}",
          "uuidMovil": "${usuario.uuidMovil}"
        }`,
        maxDaysToPersist: 7
      },

    logger: {
      debug: false,
      logLevel: BackgroundGeolocation.LogLevel.Debug
    }
  };


    if (!this.initialized) {
      const state = await BackgroundGeolocation.ready(config);

      this.tracking.set(state.enabled);
      this.initialized = true;

      BackgroundGeolocation.onLocation(location => {
        const c = location.coords;

        this.lastLocation.set(
          `${c.latitude}, ${c.longitude}`
        );

        console.log('Ubicación:', location);
      });

      BackgroundGeolocation.onHttp(event => {
        console.log('HTTP:', event);
      });

    } else {
      await BackgroundGeolocation.setConfig(config);
    }
  }

  async start(): Promise<void> {
    await BackgroundGeolocation.start();
    this.tracking.set(true);
  }

  async stop(): Promise<void> {
    await BackgroundGeolocation.stop();
    this.tracking.set(false);
  }

  async getStatus(): Promise<boolean> {
    const state = await BackgroundGeolocation.getState();
    this.tracking.set(state.enabled);
    return state.enabled;
  }
}
