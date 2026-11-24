import { Component, inject } from '@angular/core';
import { BackgroundGeolocationService } from '../../core/services/background-geolocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  geo = inject(BackgroundGeolocationService);

  async iniciar() {
    const usuarioGeo = {
      idUsuario: "bfded8ba-7775-414b-8a9a-5d3a0f09a745",
      idPersonal: 88,
      uuidMovil: 'CAP-DISPOSITIVO'
    };

    let urlBase = 'https://ceamse.ittl.com.ar/api/RestServiceImpl.svc'
    await this.geo.initialize(usuarioGeo, urlBase);
    await this.geo.start();
  }

  async detener() {
    await this.geo.stop();
  }
}